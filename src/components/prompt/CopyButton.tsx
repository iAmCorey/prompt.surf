"use client";

import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("已复制到剪贴板");
  };

  return (
    <Button 
      onClick={handleCopy} 
      variant="secondary" 
      size="sm" 
      className={className}
    >
      <Copy size={16} className="mr-1" />
      复制
    </Button>
  );
};

export default CopyButton; 