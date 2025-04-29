export interface Rbac<TResource = unknown, TActor = unknown> {
  canView(actor: TActor, resource: TResource): boolean;
  canEdit?(actor: TActor, resource: TResource): boolean;
  canDelete?(actor: TActor, resource: TResource): boolean;
  canCreate?(actor: TActor, resource: TResource): boolean;
}
