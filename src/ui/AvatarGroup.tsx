import { useMemo } from 'react';

export interface AvatarGroupMember {
  id?: number;
  name: string;
  icon_path: string;
}

interface AvatarGroupProps {
  members: readonly AvatarGroupMember[];
  maxVisible?: number;
  currentUserId?: number;
}

const avatarConfig = {
  px: 28,
  overlap: '-ml-[8px]',
  border: 'border-[1.5px]',
  iconSize: 14,
};

function Avatar({
  name,
  iconPath,
  index,
  totalVisible,
}: {
  name: string;
  iconPath: string;
  index: number;
  totalVisible: number;
}) {
  const isDefault = iconPath === '/img/icon/user.svg';

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full bg-border-secondary ${avatarConfig.border} border-solid border-white ${index > 0 ? avatarConfig.overlap : ''}`}
      style={{
        width: avatarConfig.px,
        height: avatarConfig.px,
        zIndex: totalVisible - index,
      }}
      title={name}
    >
      {!isDefault ? (
        <img
          src={iconPath}
          alt={name}
          className='h-full w-full object-cover'
        />
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <svg
            width={avatarConfig.iconSize}
            height={avatarConfig.iconSize}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.3 4.7a2.7 2.7 0 1 0 5.4 0 2.7 2.7 0 0 0-5.4 0Z'
              stroke='#fff'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4 14v-1.3A2.7 2.7 0 0 1 6.7 10h2.6a2.7 2.7 0 0 1 2.7 2.7V14'
              stroke='#fff'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export function AvatarGroup({
  members,
  maxVisible = 5,
  currentUserId,
}: AvatarGroupProps) {
  // currentUserId が指定されている場合、自分を最後に移動しつつ必ず表示枠内に入れる
  const sortedMembers = useMemo(() => {
    if (currentUserId === undefined) return members;
    const currentIndex = members.findIndex((m) => m.id === currentUserId);
    if (currentIndex === -1) return members;
    const others = members.filter((_, i) => i !== currentIndex);
    return [...others, members[currentIndex]];
  }, [members, currentUserId]);

  const visibleMembers = useMemo(() => {
    const sliced = sortedMembers.slice(0, maxVisible);
    // 自分が overflow に落ちている場合、最後の visible スロットと交換
    if (
      currentUserId !== undefined &&
      sortedMembers.length > maxVisible &&
      !sliced.some((m) => m.id === currentUserId)
    ) {
      const currentMember = sortedMembers.find((m) => m.id === currentUserId);
      if (currentMember) {
        return [...sliced.slice(0, maxVisible - 1), currentMember];
      }
    }
    return sliced;
  }, [sortedMembers, maxVisible, currentUserId]);

  const remainingCount = Math.max(0, sortedMembers.length - maxVisible);
  const remainingNames = useMemo(
    () =>
      sortedMembers
        .slice(maxVisible)
        .filter((m) => m.id !== currentUserId)
        .map((m) => m.name)
        .join(', '),
    [sortedMembers, maxVisible, currentUserId],
  );

  if (members.length === 0) return null;

  return (
    <div className='flex items-center'>
      {visibleMembers.map((member, index) => (
        <Avatar
          key={index}
          name={member.name}
          iconPath={member.icon_path}
          index={index}
          totalVisible={visibleMembers.length}
        />
      ))}
      {remainingCount > 0 && (
        <span
          className='ml-1.5 text-xs whitespace-nowrap text-text-secondary'
          title={remainingNames}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
