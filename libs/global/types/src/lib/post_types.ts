export const enum ModerationStatus {
  Approved = "Approved",
  Denied = "Denied",
  Pending = "Pending",
}

export interface Comment {
  content: string;
  id: string;
}

export interface ModerationComment extends Comment {
  status: ModerationStatus;
}

export interface Post {
  id: string;
  title: string;
}

export interface PostAggregate extends Post {
  comments: Record<string, ModerationComment>
}
