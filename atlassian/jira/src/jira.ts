// https://app.quicktype.io/
export interface Coordinate {
  changelog?:                Changelog;
  editmeta?:                 EditMeta;
  expand?:                   string;
  fields?:                   CoordinateFields;
  fieldsToInclude?:          { [key: string]: any };
  id?:                       string;
  key?:                      string;
  names?:                    Names;
  operations?:               Opsbar;
  properties?:               Properties;
  renderedFields?:           RenderedFields;
  schema?:                   Schema;
  self?:                     string;
  transitions?:              Transition[];
  versionedRepresentations?: VersionedRepresentations;
}

export interface Changelog {
  histories?:  ChangeHistory[];
  maxResults?: number;
  startAt?:    number;
  total?:      number;
}

export interface ChangeHistory {
  author?:          User;
  created?:         string;
  historyMetadata?: HistoryMetadata;
  id?:              string;
  items?:           ChangeItem[];
}

export interface User {
  active:        boolean;
  avatarUrls?:   AvatarUrls;
  displayName?:  string;
  emailAddress?: string;
  key?:          string;
  name?:         string;
  self?:         string;
  timeZone?:     string;
}

export interface AvatarUrls {
}

export interface HistoryMetadata {
  activityDescription?:    string;
  activityDescriptionKey?: string;
  actor?:                  HistoryMetadataParticipant;
  cause?:                  HistoryMetadataParticipant;
  description?:            string;
  descriptionKey?:         string;
  emailDescription?:       string;
  emailDescriptionKey?:    string;
  extraData?:              ExtraData;
  generator?:              HistoryMetadataParticipant;
  type?:                   string;
}

export interface HistoryMetadataParticipant {
  avatarURL?:      string;
  displayName?:    string;
  displayNameKey?: string;
  id?:             string;
  type?:           string;
  url?:            string;
}

export interface ExtraData {
}

export interface ChangeItem {
  field?:      string;
  fieldtype?:  string;
  from?:       string;
  fromString?: string;
  to?:         string;
  toString?:   string;
}

export interface EditMeta {
  fields?: EditmetaFields;
}

export interface EditmetaFields {
}

export interface CoordinateFields {
}

export interface Names {
}

export interface Opsbar {
  linkGroups?: LinkGroup[];
}

export interface LinkGroup {
  groups?:     LinkGroup[];
  header?:     SimpleLink;
  id?:         string;
  links?:      SimpleLink[];
  styleClass?: string;
  weight?:     number;
}

export interface SimpleLink {
  href?:       string;
  iconClass?:  string;
  id?:         string;
  label?:      string;
  styleClass?: string;
  title?:      string;
  weight?:     number;
}

export interface Properties {
  properties?: PropertiesProperties;
}

export interface PropertiesProperties {
}

export interface RenderedFields {
}

export interface Schema {
}

export interface Transition {
  expand?: string;
  fields?: TransitionFields;
  id?:     string;
  name?:   string;
  to?:     Status;
}

export interface TransitionFields {
}

export interface Status {
  description?:    string;
  iconURL?:        string;
  id?:             string;
  name?:           string;
  self?:           string;
  statusCategory?: StatusCategory;
  statusColor?:    string;
}

export interface StatusCategory {
  colorName?: string;
  id?:        number;
  key?:       string;
  name?:      string;
  self?:      string;
}

export interface VersionedRepresentations {
}
