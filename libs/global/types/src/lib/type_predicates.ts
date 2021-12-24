import { Event, EventType, CommentCreatedEvent, CommentUpdatedEvent, PostCreatedEvent } from "./event_types"

export function isCommentCreatedEvent(event: Event): event is CommentCreatedEvent {
  return event.type === EventType.CommentCreated
}

export function isCommentUpdatedEvent(event: Event): event is CommentUpdatedEvent {
  return event.type === EventType.CommentUpdated
}

export function isPostCreatedEvent(event: Event): event is PostCreatedEvent {
  return event.type === EventType.PostCreated
}
