/**
 * Bungie.Net API
 * These endpoints constitute the functionality exposed by Bungie.net, both for more traditional website functionality and for connectivity to Bungie video games and their related functionality.
 *
 * OpenAPI spec version: 2.1.5
 * Contact: support@bungie.com
 *
 * NOTE: This class is auto generated by the bungie-api-ts code generator program.
 * https://github.com/DestinyItemManager/bugie-api-ts
 * Do not edit these files manually.
 */

import {
  DestinyMilestoneContent,
  DestinyPublicActivityStatus,
  DestinyPublicMilestone
} from '../destiny2/interfaces';
import {
  GeneralUser
} from '../user/interfaces';
import {
  PagedQuery
} from '../common';
import {
  PartnershipType
} from '../platform';

export const enum TrendingEntryType {
  News = 0,
  DestinyItem = 1,
  DestinyActivity = 2,
  DestinyRitual = 3,
  SupportArticle = 4,
  Creation = 5,
  Stream = 6,
  Update = 7,
  Link = 8,
  ForumTag = 9,
  Container = 10,
  Release = 11
}

export interface TrendingCategories {
  readonly categories: TrendingCategory[];
}

export interface TrendingCategory {
  readonly categoryName: string;
  readonly entries: SearchResultOfTrendingEntry;
  readonly categoryId: string;
}

export interface SearchResultOfTrendingEntry {
  readonly results: TrendingEntry[];
  readonly totalResults: number;
  readonly hasMore: boolean;
  readonly query: PagedQuery;
  readonly replacementContinuationToken: string;
  /**
   * If useTotalResults is true, then totalResults represents an accurate count.
   *
   * If False, it does not, and may be estimated/only the size of the current page.
   *
   * Either way, you should probably always only trust hasMore.
   *
   * This is a long-held historical throwback to when we used to do paging with known
   * total results. Those queries toasted our database, and we were left to hastily
   * alter our endpoints and create backward- compatible shims, of which
   * useTotalResults is one.
   */
  readonly useTotalResults: boolean;
}

/**
 * The list entry view for trending items. Returns just enough to show the item on
 * the trending page.
 */
export interface TrendingEntry {
  /** The weighted score of this trending item. */
  readonly weight: number;
  readonly isFeatured: boolean;
  /**
   * We don't know whether the identifier will be a string, a uint, or a long... so
   * we're going to cast it all to a string. But either way, we need any trending
   * item created to have a single unique identifier for its type.
   */
  readonly identifier: string;
  /**
   * An enum - unfortunately - dictating all of the possible kinds of trending items
   * that you might get in your result set, in case you want to do custom rendering
   * or call to get the details of the item.
   */
  readonly entityType: TrendingEntryType;
  /**
   * The localized "display name/article title/'primary localized identifier'" of the
   * entity.
   */
  readonly displayName: string;
  /**
   * If the entity has a localized tagline/subtitle/motto/whatever, that is found
   * here.
   */
  readonly tagline: string;
  readonly image: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly link: string;
  /**
   * If this is populated, the entry has a related WebM video to show. I am 100%
   * certain I am going to regret putting this directly on TrendingEntry, but it will
   * work so yolo
   */
  readonly webmVideo: string;
  /**
   * If this is populated, the entry has a related MP4 video to show. I am 100%
   * certain I am going to regret putting this directly on TrendingEntry, but it will
   * work so yolo
   */
  readonly mp4Video: string;
  /**
   * If isFeatured, this image will be populated with whatever the featured image is.
   * Note that this will likely be a very large image, so don't use it all the time.
   */
  readonly featureImage: string;
  /**
   * If the item is of entityType TrendingEntryType.Container, it may have items -
   * also Trending Entries - contained within it. This is the ordered list of those
   * to display under the Container's header.
   */
  readonly items: TrendingEntry[];
  /** If the entry has a date at which it was created, this is that date. */
  readonly creationDate?: string;
}

export interface TrendingDetail {
  readonly identifier: string;
  readonly entityType: TrendingEntryType;
  readonly news: TrendingEntryNews;
  readonly support: TrendingEntrySupportArticle;
  readonly destinyItem: TrendingEntryDestinyItem;
  readonly destinyActivity: TrendingEntryDestinyActivity;
  readonly destinyRitual: TrendingEntryDestinyRitual;
  readonly creation: TrendingEntryCommunityCreation;
  readonly stream: TrendingEntryCommunityStream;
}

export interface TrendingEntryNews {
  readonly article: ContentItemPublicContract;
}

export interface ContentItemPublicContract {
  readonly contentId: string;
  readonly cType: string;
  readonly cmsPath: string;
  readonly creationDate: string;
  readonly modifyDate: string;
  readonly allowComments: boolean;
  readonly hasAgeGate: boolean;
  readonly minimumAge: number;
  readonly ratingImagePath: string;
  readonly author: GeneralUser;
  readonly autoEnglishPropertyFallback: boolean;
  /**
   * Firehose content is really a collection of metadata and "properties", which are
   * the potentially-but-not-strictly localizable data that comprises the meat of
   * whatever content is being shown.
   *
   * As Cole Porter would have crooned, "Anything Goes" with Firehose properties.
   * They are most often strings, but they can theoretically be anything. They are
   * JSON encoded, and could be JSON structures, simple strings, numbers etc... The
   * Content Type of the item (cType) will describe the properties, and thus how they
   * ought to be deserialized.
   */
  readonly properties: { [key: string]: object };
  readonly representations: ContentRepresentation[];
  readonly tags: string[];
  readonly commentSummary: CommentSummary;
}

export interface ContentRepresentation {
  readonly name: string;
  readonly path: string;
  readonly validationString: string;
}

export interface CommentSummary {
  readonly topicId: string;
  readonly commentCount: number;
}

export interface TrendingEntrySupportArticle {
  readonly article: ContentItemPublicContract;
}

export interface TrendingEntryDestinyItem {
  readonly itemHash: number;
}

export interface TrendingEntryDestinyActivity {
  readonly activityHash: number;
  readonly status: DestinyPublicActivityStatus;
}

export interface TrendingEntryDestinyRitual {
  readonly image: string;
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly dateStart?: string;
  readonly dateEnd?: string;
  /**
   * A destiny event does not necessarily have a related Milestone, but if it does
   * the details will be returned here.
   */
  readonly milestoneDetails: DestinyPublicMilestone;
  /**
   * A destiny event will not necessarily have milestone "custom content", but if it
   * does the details will be here.
   */
  readonly eventContent: DestinyMilestoneContent;
}

export interface TrendingEntryCommunityCreation {
  readonly media: string;
  readonly title: string;
  readonly author: string;
  readonly authorMembershipId: string;
  readonly postId: string;
  readonly body: string;
  readonly upvotes: number;
}

export interface TrendingEntryCommunityStream {
  readonly image: string;
  readonly title: string;
  readonly partnershipIdentifier: string;
  readonly partnershipType: PartnershipType;
}
