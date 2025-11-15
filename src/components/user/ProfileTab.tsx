"use client";

import { useState, useEffect, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import type { User } from "@/types/user-type";

interface ProfileTabProps {
  user: User;
  onProfileUpdate?: (updatedUser: Partial<User>) => void;
}

export default function ProfileTab({ user, onProfileUpdate }: ProfileTabProps) {
  const [firstName, ...restName] = (user.name || "").split(" ");
  const lastName = restName.join(" ");

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    headline: user.headline || "",
    bio: user.bio || "",
    language: user.language || "en",
    website: user.website || "",
    facebook: user.facebook || "",
    linkedin: user.linkedin || "",
    youtube: user.youtube || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const [first, ...rest] = (user.name || "").split(" ");
    setFormData({
      firstName: first,
      lastName: rest.join(" "),
      headline: user.headline || "",
      bio: user.bio || "",
      language: user.language || "en",
      website: user.website || "",
      facebook: user.facebook || "",
      linkedin: user.linkedin || "",
      youtube: user.youtube || "",
    });
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedUser: Partial<User> = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        headline: formData.headline,
        bio: formData.bio,
        language: formData.language,
        website: formData.website,
        facebook: formData.facebook,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onProfileUpdate?.(updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Public profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Add information about yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basics</h3>
            <p className="text-sm text-muted-foreground">
              Add a professional headline and basic information.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <div className="relative">
              <Input
                id="headline"
                value={formData.headline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, headline: e.target.value }))
                }
                placeholder="Instructor at EduLearn"
                maxLength={60}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-xs text-muted-foreground">
                  {60 - formData.headline.length}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Add a professional headline like &ldquo;Instructor at
              EduLearn&rdquo; or &ldquo;Architect.&rdquo;
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Biography</h3>
            <p className="text-sm text-muted-foreground">
              Links and coupon codes are not permitted in this section.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Tell learners about yourself, your experience, and what they can expect."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={formData.language}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, language: e.target.value }))
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="en">English (US)</option>
                <option value="vi">Tiếng Việt</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Links</h3>
            <p className="text-sm text-muted-foreground">
              Share websites or profiles to help learners connect with you.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                placeholder="https://your-site.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, facebook: e.target.value }))
                }
                placeholder="facebook.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
                }
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={formData.youtube}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, youtube: e.target.value }))
                }
                placeholder="youtube.com/@channel"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button type="button" variant="secondary" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
