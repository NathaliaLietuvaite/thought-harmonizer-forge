
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface AudienceSelectorProps {
  selectedAudience: string;
  setSelectedAudience: (audience: string) => void;
  audiences: { id: string; name: string; description: string }[];
}

const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudience,
  setSelectedAudience,
  audiences
}) => {
  return (
    <Card className="thought-card mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="w-5 h-5 text-harmony-teal" />
          <span>Target Audience</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedAudience} onValueChange={setSelectedAudience}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select audience" />
          </SelectTrigger>
          <SelectContent>
            {audiences.map((audience) => (
              <SelectItem key={audience.id} value={audience.id}>
                {audience.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedAudience && (
          <div className="mt-4 p-4 bg-muted/50 rounded-md">
            <h4 className="font-medium mb-1">Audience Characteristics:</h4>
            <p className="text-sm text-muted-foreground">
              {audiences.find(a => a.id === selectedAudience)?.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudienceSelector;
