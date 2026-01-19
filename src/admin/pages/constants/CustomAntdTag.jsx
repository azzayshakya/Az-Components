import React, { useMemo } from 'react';
import { Tag } from 'antd';

/**
 * CustomAntdTag
 *
 * Props:
 * - type: string (text to display)
 * - dynamic: boolean (default true)
 * - size: 'small' | 'medium' | 'large'
 */
const CustomAntdTag = ({ type = 'NA', dynamic = true, size = 'medium' }) => {
  /* ----------------------------
   * UNIQUE CLASS (NO COLLISION)
   * ---------------------------- */
  const BASE_CLASS = 'custom-antd-tag-v1';

  /* ----------------------------
   * STATIC COLOR SET (ANTD SAFE)
   * ---------------------------- */
  const STATIC_COLORS = [
    'green',
    'blue',
    'gold',
    'magenta',
    'cyan',
    'purple',
    'geekblue',
    'volcano',
  ];

  /* ----------------------------
   * DYNAMIC COLOR (HSL)
   * ---------------------------- */
  const getDynamicColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 45%)`;
  };

  /* ----------------------------
   * FINAL COLOR DECISION
   * ---------------------------- */
  const finalColor = useMemo(() => {
    if (dynamic) return getDynamicColor();
    return STATIC_COLORS[Math.floor(Math.random() * STATIC_COLORS.length)];
  }, [dynamic]);

  /* ----------------------------
   * SIZE CONFIG
   * ---------------------------- */
  const SIZE_MAP = {
    small: {
      fontSize: '11px',
      minWidth: '3.5rem',
      padding: '2px 6px',
    },
    medium: {
      fontSize: '13px',
      minWidth: '5rem',
      padding: '3px 8px',
    },
    large: {
      fontSize: '14px',
      minWidth: '7rem',
      padding: '4px 10px',
    },
  };

  const finalSize = SIZE_MAP[size] ? size : 'medium';

  /* ----------------------------
   * INLINE CSS (PULSE EFFECT)
   * ---------------------------- */
  const inlineStyles = `
    .${BASE_CLASS} {
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
      position: relative;
      background: transparent !important;
    }

    .${BASE_CLASS}--pulse::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid currentColor;
      animation: ${BASE_CLASS}-pulse 1.5s infinite;
    }

    @keyframes ${BASE_CLASS}-pulse {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      100% {
        transform: scale(1.3);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{inlineStyles}</style>

      <Tag
        className={`${BASE_CLASS} ${BASE_CLASS}--pulse`}
        color={finalColor} // ✅ ONLY color prop
        style={SIZE_MAP[finalSize]}
      >
        {String(type).toUpperCase()}
      </Tag>
    </>
  );
};

export default CustomAntdTag;
