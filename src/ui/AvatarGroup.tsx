import { useState } from "react";

import { IconUserDefault } from "./sidebar-icons";

export interface AvatarGroupMember {
  id?: number;
  name: string;
  icon_path?: string | null;
}

export interface AvatarGroupProps {
  members: readonly AvatarGroupMember[];
  maxVisible?: number;
  currentUserId?: number;
}

function Avatar({
  member,
  index,
  totalVisible,
}: {
  member: AvatarGroupMember;
  index: number;
  totalVisible: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const src = member.icon_path;
  const hasImage = src && src !== "/img/icon/user.svg" && src !== failedSrc;

  return (
    <span
      className={`flex size-7 shrink-0 overflow-hidden rounded-full border-[1.5px] border-white bg-border-secondary ${index > 0 ? "-ml-2" : ""}`}
      style={{ zIndex: totalVisible - index }}
      title={member.name}
    >
      {hasImage ? (
        <img
          src={src}
          alt={member.name}
          className="size-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span role="img" aria-label={member.name} className="size-full">
          <IconUserDefault className="size-full" />
        </span>
      )}
    </span>
  );
}

export function AvatarGroup({ members, maxVisible = 5, currentUserId }: AvatarGroupProps) {
  if (members.length === 0) return null;

  const count = Math.max(0, Math.trunc(maxVisible));
  const current =
    currentUserId === undefined ? undefined : members.find(({ id }) => id === currentUserId);
  const visible =
    current && count > 0
      ? [...members.filter((member) => member !== current).slice(0, count - 1), current]
      : members.slice(0, count);
  const remaining = members.filter((member) => !visible.includes(member));

  return (
    <div className="flex items-center">
      {visible.map((member, index) => (
        <Avatar
          key={member.id ?? `${member.name}-${index}`}
          member={member}
          index={index}
          totalVisible={visible.length}
        />
      ))}
      {remaining.length > 0 ? (
        <span
          className="ml-1.5 text-xs whitespace-nowrap text-text-muted"
          title={remaining.map(({ name }) => name).join("、")}
        >
          <span aria-hidden="true">+{remaining.length}</span>
          <span className="sr-only">ほか{remaining.length}名</span>
        </span>
      ) : null}
    </div>
  );
}
