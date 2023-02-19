import { createSchema } from "graphql-yoga";
import { messages, message, modifyMessage } from "../resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      messages(limit: Int): Messages
      message(id: String!): Message
    }

    type Mutation {
      updateMessage(input: updateMessageInput!): Message
    }

    input updateMessageInput {
      id: String
      subject: String
      body: String
    }

    type UserContext {
      type: String
      kudo: Boolean
      read: Boolean
      can_reply: Boolean
      can_kudo: Boolean
      can_delete: Boolean
    }

    type CustomTags {
      query: String
    }

    type Ratings {
      query: String
    }

    type Replies {
      query: String
    }

    type Attachments {
      query: String
    }

    type Videos {
      query: String
    }

    type Images {
      query: String
    }

    type LabelItems {
      type: String
      id: String
      text: String
    }

    type LabelsSubquried {
      type: String
      list_item_type: String
      size: Int
      items: [LabelItems]
    }

    type Labels {
      query: String
    }

    type TkbHelpfulnessRatings {
      query: String
    }

    type Tags {
      query: String
    }

    type Kudos {
      query: String
    }

    type LastEditAuthor {
      type: String
      id: String
      href: String
      view_href: String
      login: String
    }

    type CurrentRevision {
      type: String
      id: String
      last_edit_time: String
      last_edit_author: LastEditAuthor
    }

    type Metrics {
      type: String
      views: Int
    }

    type Topic {
      type: String
      id: String
      href: String
      view_href: String
    }

    type Conversation {
      type: String
      id: String
      href: String
      view_href: String
      style: String
      thread_style: String
      messages_count: Int
      solved: Boolean
      last_post_time: String
      last_post_time_friendly: String
    }

    type Board {
      type: String
      id: String
      href: String
      view_href: String
    }

    type Author {
      type: String
      id: String
      href: String
      view_href: String
      login: String
    }

    type KudoUser {
      id: String
      login: String
    }

    type KudoItems {
      id: String
      href: String
      user: KudoUser
    }

    type KudosSubquried {
      type: String
      size: Int
      items: [KudoItems]
    }

    type TagsSubquried {
      type: String
      size: Int
      items: [LabelItems]
    }

    type TKBItemField {
      id: String
      time: String
      value: Boolean
    }

    type TkbHelpfulnessRatingsSubQuried {
      type: String
      size: Int
      items: [TKBItemField]
    }

    type AlbumField {
      type: String
      id: String
      href: String
      view_href: String
      title: String
    }

    type ImagesItems {
      href: String
      view_href: String
      title: String
      description: String
      tiny_href: String
      thumb_href: String
      small_href: String
      medium_href: String
      large_href: String
      original_href: String
      width: Int
      height: Int
      upload_time: String
      upload_time_friendly: String
      album: AlbumField
      visibility: String
      moderation_status: String
    }

    type ImagesSubQuried {
      type: String
      items: [ImagesItems]
    }

    type videoItems {
      href: String
      view_href: String
      title: String
      description: String
      tiny_href: String
      video_type: String
      width: Int
      height: Int
      upload_date: String
      format: String
      moderation_status: String
    }

    type VideosSubQuried {
      type: String
      items: [videoItems]
    }

    type attachmentItems {
      href: String
      filename: String
      filesize: Int
      content_type: String
      id: String
      position: Int
      url: String
    }

    type AttachmentsSubQuried {
      type: String
      items: [attachmentItems]
    }

    type ParentField {
      type: String
      id: String
      href: String
      view_href: String
    }

    type repliesItems {
      type: String
      id: String
      href: String
      view_href: String
      author: Author
      subject: String
      search_snippet: String
      body: String
      board: Board
      conversation: Conversation
      topic: Topic
      parent: ParentField
      depth: Int
    }

    type RepliesSubQuried {
      type: String
      items: [repliesItems]
    }

    type ratingsItems {
      id: String
      time: String
      value: Int
      user: KudoUser
    }

    type RatingsSubQuried {
      type: String
      items: [ratingsItems]
    }

    type MessageScopField {
      text: String
      value: String
    }

    type customTagsItems {
      id: String
      href: String
      message_scope: MessageScopField
      possible_values: String
      text: String
    }

    type CustomTags {
      type: String
      items: [customTagsItems]
    }

    type Message {
      type: String
      id: String
      href: String
      view_href: String
      subject: String
      search_snippet: String
      body: String
      teaser: String
      post_time: String
      post_time_friendly: String
      depth: Int
      read_only: Boolean
      edit_frozen: Boolean
      language: String
      can_accept_solution: Boolean
      placeholder: Boolean
      is_solution: Boolean
      moderation_status: String
      visibility_scope: String
      device_id: String
      popularity: Float
      excluded_from_kudos_leaderboards: Boolean
      is_promoted: Boolean
      user_context: UserContext
      custom_tags: CustomTags
      ratings: RatingsSubQuried
      replies: RepliesSubQuried
      attachments: AttachmentsSubQuried
      videos: VideosSubQuried
      images: ImagesSubQuried
      labels: LabelsSubquried
      tkb_helpfulness_ratings: TkbHelpfulnessRatingsSubQuried
      tags: TagsSubquried
      kudos: KudosSubquried
      current_revision: CurrentRevision
      metrics: Metrics
      topic: Topic
      conversation: Conversation
      board: Board
      author: Author
    }

    type Items2 {
      type: String
      id: String
      href: String
      view_href: String
      subject: String
      search_snippet: String
      body: String
      teaser: String
      post_time: String
      post_time_friendly: String
      depth: Int
      read_only: Boolean
      edit_frozen: Boolean
      language: String
      can_accept_solution: Boolean
      placeholder: Boolean
      is_solution: Boolean
      moderation_status: String
      visibility_scope: String
      device_id: String
      popularity: Float
      excluded_from_kudos_leaderboards: Boolean
      is_promoted: Boolean
      user_context: UserContext
      custom_tags: CustomTags
      ratings: Ratings
      replies: Replies
      attachments: Attachments
      videos: Videos
      images: Images
      labels: Labels
      tkb_helpfulness_ratings: TkbHelpfulnessRatings
      tags: Tags
      kudos: Kudos
      current_revision: CurrentRevision
      metrics: Metrics
      topic: Topic
      conversation: Conversation
      board: Board
      author: Author
    }

    type Messages {
      type: String
      list_item_type: String
      size: Int
      next_cursor: String
      items: [Message]
    }

    # type MessageData {
    #   message: Items
    # }
  `,

  resolvers: {
    Query: {
      messages: messages,
      message: message,
    },
    Mutation: {
      updateMessage: modifyMessage,
    },
  },
});
