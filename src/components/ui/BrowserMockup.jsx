import styles from "./BrowserMockup.module.css";

const COLORS = {
  navy900: "#010f1f",
  navy800: "#01174b",
  navyBtn: "#02174a",
  blueAccent: "#3d86c4",
  blueAccentDeep: "#2f6ea0",
  grayPlaceholder: "#80878f",
  borderSubtle: "rgba(1, 15, 31, 0.06)",
  white: "#ffffff",
};

const FONT_DISPLAY = '"Neue Haas Grotesk Display Pro", "Helvetica Neue", Arial, sans-serif';

function fadeUpStyle(animate, delayMs, { distance = 10, opacity = 1 } = {}) {
  return {
    opacity: animate ? opacity : 0,
    transform: animate ? "translateY(0)" : `translateY(${distance}px)`,
    transition: animate ? `opacity 0.5s ease ${delayMs}ms, transform 0.5s ease ${delayMs}ms` : "none",
  };
}

function growUpStyle(animate, delayMs) {
  return {
    transformBox: "fill-box",
    transformOrigin: "bottom",
    transform: animate ? "scaleY(1)" : "scaleY(0)",
    transition: animate ? `transform 0.5s ease ${delayMs}ms` : "none",
  };
}

const CARD = { x: 32, y: 68, width: 340, height: 268 };
const INNER = {
  x: CARD.x + 28,
  y: CARD.y + 28,
  width: CARD.width - 56,
  height: CARD.height - 56,
};

function Defs({ uid }) {
  return (
    <defs>
      <linearGradient id={`bg-gradient-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.navy800} />
        <stop offset="100%" stopColor={COLORS.navy900} />
      </linearGradient>
      <linearGradient id={`accent-gradient-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={COLORS.blueAccent} />
        <stop offset="100%" stopColor={COLORS.blueAccentDeep} />
      </linearGradient>
      <filter id={`card-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#010f1f" floodOpacity="0.22" />
      </filter>
    </defs>
  );
}

function Background({ uid }) {
  return <rect x="0" y="0" width="404" height="404" rx="12" fill={`url(#bg-gradient-${uid})`} />;
}

function BrowserCard({ uid, children }) {
  return (
    <>
      <g filter={`url(#card-shadow-${uid})`}>
        <rect
          x={CARD.x}
          y={CARD.y}
          width={CARD.width}
          height={CARD.height}
          rx="16"
          fill={COLORS.white}
          stroke={COLORS.borderSubtle}
        />
      </g>
      <circle cx={CARD.x + 20} cy={CARD.y + 20} r="3.5" fill="#d7dbe1" />
      <circle cx={CARD.x + 34} cy={CARD.y + 20} r="3.5" fill="#d7dbe1" />
      <circle cx={CARD.x + 48} cy={CARD.y + 20} r="3.5" fill="#d7dbe1" />
      <line
        x1={CARD.x}
        y1={CARD.y + 36}
        x2={CARD.x + CARD.width}
        y2={CARD.y + 36}
        stroke="#f1f2f4"
        strokeWidth="1"
      />
      {children}
    </>
  );
}

function SiteMockup({ animate }) {
  const uid = "site";
  const heroY = CARD.y + 56;
  const heroBottom = CARD.y + CARD.height - 20;
  const heroHeight = heroBottom - heroY;

  const titleWidth = 150;
  const subtitleWidth = 110;
  const buttonWidth = 92;

  const bannerHeight = 84;
  const bannerGap = 20;

  const blockHeights = { title: 11, subtitle: 8, button: 30 };
  const gaps = { afterTitle: 9, afterSubtitle: 18 };
  const usedHeight =
    bannerHeight +
    bannerGap +
    blockHeights.title +
    gaps.afterTitle +
    blockHeights.subtitle +
    gaps.afterSubtitle +
    blockHeights.button;
  let cursorY = heroY + (heroHeight - usedHeight) / 2;

  const bannerY = cursorY;
  cursorY += bannerHeight + bannerGap;
  const titleY = cursorY;
  cursorY += blockHeights.title + gaps.afterTitle;
  const subtitleY = cursorY;
  cursorY += blockHeights.subtitle + gaps.afterSubtitle;
  const buttonY = cursorY;
  const textX = INNER.x + 24;
  const bannerCx = INNER.x + INNER.width / 2;
  const bannerCy = bannerY + bannerHeight / 2 + 6;

  return (
    <>
      <Defs uid={uid} />
      <Background uid={uid} />
      <BrowserCard uid={uid}>
        <g style={fadeUpStyle(animate, 0)}>
          <rect
            x={INNER.x}
            y={bannerY}
            width={INNER.width}
            height={bannerHeight}
            rx="10"
            fill={`url(#accent-gradient-${uid})`}
            opacity="0.7"
          />
          <polygon
            points={`${bannerCx - 20},${bannerCy} ${bannerCx - 8},${bannerCy - 16} ${bannerCx + 2},${bannerCy}`}
            fill={COLORS.white}
            opacity="0.85"
          />
          <polygon
            points={`${bannerCx - 6},${bannerCy} ${bannerCx + 8},${bannerCy - 22} ${bannerCx + 20},${bannerCy}`}
            fill={COLORS.white}
          />
          <circle
            cx={bannerCx + 9}
            cy={bannerCy - 27}
            r="5"
            fill={COLORS.white}
            opacity="0.85"
            className={styles.floatIcon}
          />
        </g>
        <rect
          x={textX}
          y={titleY}
          width={titleWidth}
          height={blockHeights.title}
          rx="5.5"
          fill={COLORS.navy900}
          style={fadeUpStyle(animate, 120, { opacity: 0.85 })}
        />
        <rect
          x={textX}
          y={subtitleY}
          width={subtitleWidth}
          height={blockHeights.subtitle}
          rx="4"
          fill={COLORS.grayPlaceholder}
          style={fadeUpStyle(animate, 200, { opacity: 0.5 })}
        />
        <rect
          x={textX}
          y={buttonY}
          width={buttonWidth}
          height={blockHeights.button}
          rx="8"
          fill={COLORS.navy900}
          style={fadeUpStyle(animate, 280, { opacity: 0.85 })}
        />
      </BrowserCard>
    </>
  );
}

function LandingPageMockup({ animate }) {
  const uid = "landing";
  const heroY = CARD.y + 56;
  const centerX = CARD.x + CARD.width / 2;

  const titleWidth = 160;
  const subtitleWidth = 120;
  const buttonWidth = 150;

  const blockHeights = { title: 12, subtitle: 8, button: 30 };
  const gaps = { afterTitle: 10, afterSubtitle: 20 };
  let cursorY = heroY + 10;

  const titleY = cursorY;
  cursorY += blockHeights.title + gaps.afterTitle;
  const subtitleY = cursorY;
  cursorY += blockHeights.subtitle + gaps.afterSubtitle;
  const buttonY = cursorY;

  const dotsY = CARD.y + CARD.height - 16;

  return (
    <>
      <Defs uid={uid} />
      <Background uid={uid} />
      <BrowserCard uid={uid}>
        <rect
          x={centerX - titleWidth / 2}
          y={titleY}
          width={titleWidth}
          height={blockHeights.title}
          rx="6"
          fill={COLORS.navy900}
          style={fadeUpStyle(animate, 0, { opacity: 0.85 })}
        />
        <rect
          x={centerX - subtitleWidth / 2}
          y={subtitleY}
          width={subtitleWidth}
          height={blockHeights.subtitle}
          rx="4"
          fill={COLORS.grayPlaceholder}
          style={fadeUpStyle(animate, 100, { opacity: 0.5 })}
        />
        <g style={fadeUpStyle(animate, 200)}>
          <rect
            x={centerX - buttonWidth / 2}
            y={buttonY}
            width={buttonWidth}
            height={blockHeights.button}
            rx="8"
            fill={COLORS.navy900}
            opacity="0.85"
          />
          <text
            x={centerX}
            y={buttonY + blockHeights.button / 2 + 4}
            fontSize="12"
            fontWeight="400"
            fill={COLORS.white}
            fontFamily={FONT_DISPLAY}
            textAnchor="middle"
          >
            Quero converter mais
          </text>
        </g>
        <g style={fadeUpStyle(animate, 320, { distance: 0 })}>
          <circle cx={centerX - 12} cy={dotsY} r="3" fill={COLORS.blueAccent} className={styles.pulseDot} />
          <circle cx={centerX} cy={dotsY} r="3" fill="#d7dbe1" />
          <circle cx={centerX + 12} cy={dotsY} r="3" fill="#d7dbe1" />
        </g>
      </BrowserCard>
    </>
  );
}

function AdsMockup({ animate }) {
  const uid = "ads";
  const bars = [40, 62, 50, 80, 96, 72, 116];
  const labelY = CARD.y + 56;
  const valueY = labelY + 32;
  const chartTop = valueY + 24;
  const chartBottom = CARD.y + CARD.height - 24;
  const barWidth = 24;
  const gap = 13;
  const chartWidth = bars.length * barWidth + (bars.length - 1) * gap;
  const chartLeft = INNER.x + (INNER.width - chartWidth) / 2;

  return (
    <>
      <Defs uid={uid} />
      <Background uid={uid} />
      <g filter={`url(#card-shadow-${uid})`}>
        <rect
          x={CARD.x}
          y={CARD.y}
          width={CARD.width}
          height={CARD.height}
          rx="16"
          fill={COLORS.white}
          stroke={COLORS.borderSubtle}
        />
      </g>
      <text
        x={INNER.x}
        y={labelY}
        fontSize="13"
        fill={COLORS.grayPlaceholder}
        fontFamily={FONT_DISPLAY}
        style={fadeUpStyle(animate, 0)}
      >
        Cliques na campanha
      </text>
      <text
        x={INNER.x}
        y={valueY}
        fontSize="26"
        fontWeight="500"
        fill={COLORS.navy900}
        fontFamily={FONT_DISPLAY}
        style={fadeUpStyle(animate, 80, { opacity: 0.85 })}
      >
        +38%
      </text>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={chartLeft + i * (barWidth + gap)}
          y={Math.max(chartBottom - h, chartTop)}
          width={barWidth}
          height={Math.min(h, chartBottom - chartTop)}
          rx="5"
          fill={i === bars.length - 1 ? `url(#accent-gradient-${uid})` : "#eef1f4"}
          className={i === bars.length - 1 ? styles.pulseGlow : ""}
          style={growUpStyle(animate, 160 + i * 60)}
        />
      ))}
    </>
  );
}

const MOCKUPS = {
  site: SiteMockup,
  landing: LandingPageMockup,
  ads: AdsMockup,
};

export default function BrowserMockup({ type = "site", animate = true }) {
  const Mockup = MOCKUPS[type] || SiteMockup;

  return (
    <svg viewBox="0 0 404 404" width="100%" height="100%" role="img" aria-hidden="true">
      <Mockup animate={animate} />
    </svg>
  );
}
