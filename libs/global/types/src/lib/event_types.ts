import type { ModerationComment, Post } from "./post_types"

export const enum EventType {
  CommentCreated = "CommentCreated",
  CommentUpdated = "CommentUpdated",
  PostCreated = "PostCreated",
}

export interface CommentCreatedEvent {
  data: { postId: string } & ModerationComment;
  type: EventType.CommentCreated;
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

export type Event = CommentCreatedEvent | CommentUpdatedEvent | PostCreatedEvent
