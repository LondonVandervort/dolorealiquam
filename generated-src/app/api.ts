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

import { HttpClient } from '../http';

import {
  Application
} from './interfaces';
import {
  ServerResponse
} from '../common';

/** Get of applications created by Bungie. */
export function getBungieApplications(http: HttpClient): Promise<ServerResponse<Application[]>> {
  return http({
    method: 'GET',
    url: 'https://www.bungie.net/Platform/App/FirstParty/'
  });
}
