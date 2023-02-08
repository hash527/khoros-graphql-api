import { createSchema } from "graphql-yoga";
import { messages, message } from "../resolvers";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      messages(limit: Int): MessagesData
      message(id: String!): Items
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

    type Items {
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

    type MessagesData {
      type: String
      list_item_type: String
      size: Int
      next_cursor: String
      items: [Items]
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
  },
});
