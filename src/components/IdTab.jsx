import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IdTab = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idProof">Id Proof File</Label>
          <Input
            type="file"
            id="idProof"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateField("idProof", file);
                updateField("idProofFileName", file.name);
              } else {
                updateField("idProof", null);
                updateField("idProofFileName", "");
              }
            }}
          />
          {formData.idProofFileName && (
            <p className="text-xs text-gray-500 mt-1">{formData.idProofFileName}</p>
          )}
        </div>

         <div>
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            value={formData.password || ""}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="Enter Password"
          />
        </div>

        <div>
          <Label htmlFor="termsAccepted">Terms</Label>
          <Input
            id="termsAccepted"
            value={formData.termsAccepted || ""}
            onChange={(e) => updateField("termsAccepted", e.target.value)}
            placeholder="Enter Terms"
          />
        </div>

      </div>

    </div>
  );
};

export default IdTab;
