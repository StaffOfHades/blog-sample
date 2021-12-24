import type { ModerationComment, Post } from "./post_types"

export const enum EventType {
  CommentCreated = "CommentCreated",
  CommentModerated = "CommentModerated",
  CommentUpdated = "CommentUpdated",
  PostCreated = "PostCreated",
}

export interface CommentCreatedEvent {
  data: { postId: string } & ModerationComment;
  type: EventType.CommentCreated;
}

export interface CommentModeratedEvent {
  data: { postId: string; } & Pick<ModerationComment, "id" | "status">
  type: EventType.CommentModerated
}

export interface CommentUpdatedEvent {
  data: {
    id: string;
    postId: string;
  } & Partial<Omit<ModerationComment, "id">>;
  type: EventType.CommentUpdated;
}

export interface PostCreatedEvent {
  data: Post;
  type: EventType.PostCreated;
}

export type Event = CommentCreatedEvent | CommentModeratedEvent | CommentUpdatedEvent | PostCreatedEvent
