'use client';
import React, { useRef, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Star, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface UploadedImage {
  id?: string;
  url: string;
  publicId: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  isPrimary: boolean;
  displayOrder: number;
  altText?: string;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  productSlug?: string;
}

function SortableImageCard({ img, onRemove, onSetPrimary, onAltChange }: { 
  img: UploadedImage, 
  onRemove: () => void, 
  onSetPrimary: () => void,
  onAltChange: (val: string) => void 
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.publicId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group bg-beige border border-border flex flex-col items-center">
      <div className="relative w-full aspect-square cursor-grab" {...attributes} {...listeners}>
        <img 
          src={img.thumbnailUrl || img.url} 
          alt="Preview" 
          className="w-full h-full object-cover" 
          draggable={false}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onSetPrimary(); }} 
            className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
            title="Set as Primary"
          >
            <Star className={cn("w-4 h-4", img.isPrimary && "fill-white")} />
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }} 
            className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {img.isPrimary && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase tracking-wider px-2 py-1">
            Primary
          </div>
        )}
      </div>
      
      {/* Alt Text Input */}
      <input
        type="text"
        placeholder="Alt text..."
        value={img.altText || ''}
        onChange={(e) => onAltChange(e.target.value)}
        className="w-full text-xs p-2 border-t border-border focus:outline-none focus:bg-cream"
      />
    </div>
  );
}

export function ImageUploader({ value = [], onChange, productSlug = 'temp' }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    if (value.length + e.target.files.length > 10) {
      alert('Maximum 10 images allowed.');
      return;
    }

    setIsUploading(true);
    const newImages = [...value];
    
    for (const file of Array.from(e.target.files)) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit.`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('productSlug', productSlug);

      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Upload failed');

        newImages.push({
          url: data.url,
          publicId: data.publicId,
          thumbnailUrl: data.thumbnailUrl,
          width: data.width,
          height: data.height,
          isPrimary: newImages.length === 0, // Make first image primary
          displayOrder: newImages.length,
          altText: ''
        });
      } catch (err) {
        console.error(err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    onChange(newImages);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (publicId: string) => {
    // We only remove from UI array here. Actual DB/R2 deletion happens on save/API call.
    const newImages = value.filter(img => img.publicId !== publicId);
    
    // Ensure one primary exists
    if (newImages.length > 0 && !newImages.some(img => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }
    
    onChange(newImages);
  };

  const handleSetPrimary = (publicId: string) => {
    const newImages = value.map(img => ({
      ...img,
      isPrimary: img.publicId === publicId
    }));
    onChange(newImages);
  };

  const handleAltChange = (publicId: string, altText: string) => {
    const newImages = value.map(img => img.publicId === publicId ? { ...img, altText } : img);
    onChange(newImages);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = value.findIndex(img => img.publicId === active.id);
      const newIndex = value.findIndex(img => img.publicId === over.id);
      const reordered = arrayMove(value, oldIndex, newIndex).map((img, i) => ({ ...img, displayOrder: i }));
      onChange(reordered);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-sans text-xs uppercase tracking-widest text-black/60">Product Images</label>
        <span className="text-xs text-muted">{value.length}/10 images</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SortableContext items={value.map(v => v.publicId)} strategy={rectSortingStrategy}>
            {value.map(img => (
              <SortableImageCard 
                key={img.publicId} 
                img={img} 
                onRemove={() => handleRemove(img.publicId)}
                onSetPrimary={() => handleSetPrimary(img.publicId)}
                onAltChange={(val) => handleAltChange(img.publicId, val)}
              />
            ))}
          </SortableContext>
          
          {/* Upload Button */}
          {value.length < 10 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full aspect-square border-2 border-dashed border-border flex flex-col items-center justify-center text-muted hover:text-black hover:border-black/30 transition-colors disabled:opacity-50"
            >
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-xs font-sans uppercase tracking-widest">
                {isUploading ? 'Uploading...' : 'Add Images'}
              </span>
            </button>
          )}
        </div>
      </DndContext>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        className="hidden"
      />
    </div>
  );
}
