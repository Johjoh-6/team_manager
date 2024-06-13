/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Bills = "bills",
	EventType = "event_type",
	Events = "events",
	MatchHistory = "match_history",
	Players = "players",
	Positions = "positions",
	Roles = "roles",
	Sports = "sports",
	Teams = "teams",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum BillsCurrencyOptions {
	"EUR" = "EUR",
	"USD" = "USD",
}
export type BillsRecord = {
	amount?: number
	bill_date: IsoDateString
	currency: BillsCurrencyOptions
	id_payment?: string
	team: RecordIdString
}

export type EventTypeRecord = {
	name?: string
}

export type EventsRecord = {
	date_end: IsoDateString
	date_start: IsoDateString
	location?: string
	name?: string
	team?: RecordIdString
	type: RecordIdString
}

export type MatchHistoryRecord = {
	description?: HTMLString
	match_date: IsoDateString
	name: string
	score?: number
	score_opponent?: number
	team?: RecordIdString
	team_opponent?: RecordIdString
	team_opponent_name?: string
}

export type PlayersRecord = {
	biography?: HTMLString
	bod?: IsoDateString
	claimed?: boolean
	first_name?: string
	handy_comment?: string
	handy_point?: number
	height?: number
	last_name?: string
	picture?: string
	player_number?: number
	user_link?: RecordIdString
	weigth?: number
}

export type PositionsRecord = {
	name?: string
}

export type RolesRecord = {
	name?: string
}

export type SportsRecord = {
	name?: string
}

export type TeamsRecord = {
	contact_info?: string
	description?: HTMLString
	location?: string
	logo?: string
	manager: RecordIdString
	name?: string
	players?: RecordIdString[]
	premium?: boolean
	sport?: RecordIdString
}

export type UsersRecord = {
	first_name?: string
	last_name?: string
	name?: string
	role: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>
export type EventTypeResponse<Texpand = unknown> = Required<EventTypeRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type MatchHistoryResponse<Texpand = unknown> = Required<MatchHistoryRecord> & BaseSystemFields<Texpand>
export type PlayersResponse<Texpand = unknown> = Required<PlayersRecord> & BaseSystemFields<Texpand>
export type PositionsResponse<Texpand = unknown> = Required<PositionsRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Texpand = unknown> = Required<RolesRecord> & BaseSystemFields<Texpand>
export type SportsResponse<Texpand = unknown> = Required<SportsRecord> & BaseSystemFields<Texpand>
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	bills: BillsRecord
	event_type: EventTypeRecord
	events: EventsRecord
	match_history: MatchHistoryRecord
	players: PlayersRecord
	positions: PositionsRecord
	roles: RolesRecord
	sports: SportsRecord
	teams: TeamsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	bills: BillsResponse
	event_type: EventTypeResponse
	events: EventsResponse
	match_history: MatchHistoryResponse
	players: PlayersResponse
	positions: PositionsResponse
	roles: RolesResponse
	sports: SportsResponse
	teams: TeamsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'bills'): RecordService<BillsResponse>
	collection(idOrName: 'event_type'): RecordService<EventTypeResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'match_history'): RecordService<MatchHistoryResponse>
	collection(idOrName: 'players'): RecordService<PlayersResponse>
	collection(idOrName: 'positions'): RecordService<PositionsResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'sports'): RecordService<SportsResponse>
	collection(idOrName: 'teams'): RecordService<TeamsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
