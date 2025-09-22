import React from "react";
import styled from "styled-components";

/**
 * MoleculeIdeaData
 * - 8개의 상위 아이템을 4x2 그리드로 표시
 * - 각 아이템은 하위 데이터 선택 현황을 "x/8" 뱃지로 표시
 * - 상위 아이템은 동시에 하나만 선택(라디오 형태)
 * - 하단(별도 영역)에서 하위 데이터 선택이 바뀌면 selectedCount를 갱신해 props로 넘겨주세요
 *
 * Props:
 *  items: Array<{
 *    id: string | number;
 *    title: string;           // 카드 제목
 *    selectedCount?: number;  // 하위 8개 중 선택된 개수 (0~8)
 *  }>
 *  selectedItemId?: string | number; // (선택) 외부 제어형 선택 id
 *  onSelect?: (id) => void            // 상위 카드 선택 콜백
 *  badgeTotal?: number                // 기본 8
 *  className?: string
 *
 * 사용 예:
 *  const [activeId, setActiveId] = React.useState('a');
 *  const [items, setItems] = React.useState([
 *    { id: 'a', title: '테마에 따른 이름', selectedCount: 2 },
 *    { id: 'b', title: '테마 이름이 들어감', selectedCount: 0 },
 *    { id: 'c', title: '테마 짧음말고 긴버전', selectedCount: 0 },
 *    { id: 'd', title: '테마 짧음', selectedCount: 0 },
 *    { id: 'e', title: '테마 짧음', selectedCount: 0 },
 *    { id: 'f', title: '테마에 따른 이름', selectedCount: 0 },
 *    { id: 'g', title: '테마 짧음말고 긴버전', selectedCount: 0 },
 *    { id: 'h', title: '테마 이름이 들어감', selectedCount: 0 },
 *  ]);
 *
 *  <MoleculeIdeaData
 *    items={items}
 *    selectedItemId={activeId}
 *    onSelect={setActiveId}
 *  />
 */

export const MoleculeIdeaData = ({
  items = [],
  selectedItemId,
  onSelect,
  badgeTotal = 8,
  className,
}) => {
  // Uncontrolled fallback
  const [internalSelectedId, setInternalSelectedId] = React.useState(
    () => selectedItemId ?? items?.[0]?.id
  );
  const isControlled = selectedItemId !== undefined && selectedItemId !== null;
  const activeId = isControlled ? selectedItemId : internalSelectedId;

  const handleSelect = (id) => {
    if (!isControlled) setInternalSelectedId(id);
    if (onSelect) onSelect(id);
  };

  const getNextIndex = (currentIndex, delta) => {
    if (!items.length) return 0;
    const next = (currentIndex + delta + items.length) % items.length;
    return next;
  };

  const handleKeyDown = (e, index) => {
    // 좌우/상하 이동 지원 (4열 그리드 가정)
    // Left/Right/Up/Down, Space/Enter 선택
    const key = e.key;
    let nextIndex = null;

    if (key === "ArrowRight") nextIndex = getNextIndex(index, 1);
    if (key === "ArrowLeft") nextIndex = getNextIndex(index, -1);
    if (key === "ArrowDown") nextIndex = getNextIndex(index, 4);
    if (key === "ArrowUp") nextIndex = getNextIndex(index, -4);

    if (nextIndex !== null) {
      e.preventDefault();
      const nextId = items[nextIndex]?.id;
      if (nextId !== undefined) {
        handleSelect(nextId);
      }
      return;
    }

    if (key === " " || key === "Enter") {
      e.preventDefault();
      handleSelect(items[index]?.id);
    }
  };

  return (
    <Wrapper
      role="radiogroup"
      aria-label="아이디어 데이터 선택"
      className={className}
    >
      <Grid>
        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          const count = clamp(item.selectedCount ?? 0, 0, item.numberOfIdeas);
          return (
            <Card
              key={item.id}
              $active={isActive}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              data-id={item.id}
            >
              <CardTitle $active={isActive}>{item.title}</CardTitle>

              <Badge $active={isActive} aria-label={`선택 ${count}/${item.numberOfIdeas}`}>
                <BadgeText $active={isActive}>
                  {count}/{item.numberOfIdeas}
                </BadgeText>
              </Badge>
            </Card>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

/* -------------------- styled -------------------- */

const COLORS = {
  primary: "#226FFF",
  primaryTint: "#F0F4FF",
  bgMuted: "#F7F8FA",
  line: "#E0E4EB",
  textMuted: "#8C8C8C",
  white: "#FFFFFF",
};

const Wrapper = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 820px;
  width: 100%;
`;

const Card = styled.button`
  appearance: none;
  border: 1px solid ${({ $active }) => ($active ? COLORS.primary : COLORS.line)};
  background: ${({ $active }) => ($active ? COLORS.primary : COLORS.bgMuted)};
  border-radius: 8px;
  outline: none;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;
  min-width: fit-content;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ $active }) => ($active ? COLORS.primaryTint : "rgba(34,111,255,0.25)")};
  }
`;

const CardTitle = styled.span`
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.textMuted)};
  font-size: 14px;
  font-family: Pretendard, Poppins;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  line-height: 24px;
  white-space: nowrap;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? COLORS.primaryTint : COLORS.line)};
`;

const BadgeText = styled.span`
  color: ${({ $active }) => ($active ? COLORS.primary : COLORS.textMuted)};
  font-size: 12px;
  font-family: Pretendard, Poppins;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;

/* -------------------- utils -------------------- */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
