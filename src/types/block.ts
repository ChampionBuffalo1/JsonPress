export type Blocks = {
  _id: string;
  slug: string;
  title: string;
  views: number;
  category: string;
  coverImage: string;
  lastEditedAt: Date;
  description: string;
  isPublished: boolean;
  author: {
    _id: string;
    name: string;
    role: "normal" | "admin" | "manager";
    socialMedia?: {
      website?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
};
