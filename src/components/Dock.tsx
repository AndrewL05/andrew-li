import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface DockProps {
  light: boolean;
  windowHidden?: boolean;
  onRestore?: () => void;
  onOpenResume?: () => void;
}

interface DockItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  dot?: boolean;
  bgFrom: string;
  bgTo: string;
  sideColor: string;
  // bottom/left face color
  shadowColor: string;
  logo: React.ReactNode;
}

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ResumeLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="white" fillOpacity="0.95" />
    <path d="M14 2v6h6" stroke="rgba(200,60,40,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="13" x2="16" y2="13" stroke="rgba(200,60,40,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="17" x2="16" y2="17" stroke="rgba(200,60,40,0.55)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="9" x2="11" y2="9" stroke="rgba(200,60,40,0.5)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PortfolioLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" width="19" height="19">
    <rect x="2" y="4" width="20" height="15" rx="2.5" fill="white" fillOpacity="0.9" />
    <rect x="2" y="4" width="20" height="5" rx="2.5" fill="rgba(91,33,182,0.18)" />
    <circle cx="5.5" cy="6.5" r="1" fill="rgba(91,33,182,0.55)" />
    <circle cx="8.5" cy="6.5" r="1" fill="rgba(91,33,182,0.38)" />
    <path d="M8 13.5l2.5 2.5 5-5" stroke="rgba(91,33,182,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="19" width="8" height="1.5" rx="0.75" fill="white" fillOpacity="0.5" />
  </svg>
);

/*
 Geometry: W × H × D = 56 × 56 × 14 px rectangular prism
 Coordinate origin: top-left corner of the parent box, z=0 is the front face.

 Front face : inset 0, z = 0 (facing +Z toward viewer)
 Bottom face: top:H=56, left:0, w:W, h:D  → transformOrigin top → rotateX(-90deg) → spans z=0..–D
 Left face  : left:–D=–14, top:0, w:D, h:H → transformOrigin right → rotateY(-90deg) → spans z=0..–D
 Right face : left:W=56, top:0, w:D, h:H → transformOrigin left → rotateY(90deg)  → spans z=0..–D
 Top face   : top:–D=–14, left:0, w:W, h:D → transformOrigin bottom → rotateX(90deg) → spans z=0..–D
 Back face  : inset 0, z = -D (facing -Z away from viewer)

 The parent motion.div applies: perspective (via parent wrapper) + rotateX/rotateY + floating y
*/


const W = 44, H = 44, D = 18;

interface SlabProps {
  item: DockItem;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

const IconSlab = ({ item, index, isHovered, onEnter, onLeave }: SlabProps) => {
  const delay = index * 0.42;
  const controls = useAnimation();
  const isHoveredRef = useRef(false);

  const startFloat = (withDelay = false) => {
    controls.start({
      y: [0, -10, 0],
      rotateX: [26, 22, 26],
      rotateY: [-32, -27, -32],
      transition: {
        duration: 3.4,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        delay: withDelay ? delay : 0,
      },
    });
  };

  useEffect(() => {
    startFloat(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = () => {
    isHoveredRef.current = true;
    onEnter();
    controls.start({
      scale: 1.15,
      y: -14,
      rotateX: 0,
      rotateY: 0,
      transition: {
        scale: { type: "spring", stiffness: 340, damping: 18 },
        y: { type: "spring", stiffness: 340, damping: 18 },
        rotateX: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
        rotateY: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    });
  };

  const handleLeave = async () => {
    isHoveredRef.current = false;
    onLeave();
    await controls.start({
      scale: 1,
      y: 0,
      rotateX: 26,
      rotateY: -32,
      transition: { type: "spring", stiffness: 200, damping: 22 },
    });
    if (!isHoveredRef.current) {
      startFloat(false);
    }
  };

  const faceBase: React.CSSProperties = { position: "absolute" };

  const frontFace: React.CSSProperties = {
    ...faceBase,
    inset: 0,
    borderRadius: "22%",
    overflow: "hidden",
    background: `linear-gradient(145deg, ${item.bgFrom} 0%, ${item.bgTo} 100%)`,
  };

  const sideFadeTransition = "opacity 0.35s ease";
  const sideOpacity = isHovered ? 0 : 1;

  const bottomFace: React.CSSProperties = {
    ...faceBase,
    left: 0,
    top: H,
    width: W,
    height: D,
    transformOrigin: "top center",
    transform: "rotateX(-90deg)",
    background: `linear-gradient(180deg, ${item.sideColor} 0%, ${item.bgTo} 100%)`,
    borderRadius: "10px 10px 3px 3px",
    opacity: sideOpacity,
    transition: sideFadeTransition,
  };

  const leftFace: React.CSSProperties = {
    ...faceBase,
    left: -D,
    top: 0,
    width: D,
    height: H,
    transformOrigin: "right center",
    transform: "rotateY(-90deg)",
    background: `linear-gradient(270deg, ${item.sideColor} 0%, ${item.bgTo} 100%)`,
    borderRadius: "3px 10px 10px 3px",
    opacity: sideOpacity,
    transition: sideFadeTransition,
  };

  const rightFace: React.CSSProperties = {
    ...faceBase,
    left: W,
    top: 0,
    width: D,
    height: H,
    transformOrigin: "left center",
    transform: "rotateY(90deg)",
    background: item.sideColor,
    borderRadius: "10px 3px 3px 10px",
    opacity: isHovered ? 0 : 0.55,
    transition: sideFadeTransition,
  };

  const topFace: React.CSSProperties = {
    ...faceBase,
    left: 0,
    top: -D,
    width: W,
    height: D,
    transformOrigin: "bottom center",
    transform: "rotateX(90deg)",
    background: `linear-gradient(0deg, ${item.bgFrom}, rgba(255,255,255,0.22))`,
    borderRadius: "3px 3px 10px 10px",
    opacity: isHovered ? 0 : 0.85,
    transition: sideFadeTransition,
  };

  const backFace: React.CSSProperties = {
    ...faceBase,
    inset: 0,
    transform: `translateZ(${-D}px)`,
    background: item.sideColor,
    borderRadius: "22%",
  };

  return (
    <div style={{ perspective: "700px", cursor: "pointer", userSelect: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: -14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 10,
          background: `radial-gradient(ellipse, ${item.shadowColor} 0%, transparent 70%)`,
          filter: "blur(6px)",
          opacity: isHovered ? 0.35 : 0.65,
          transition: "opacity 200ms ease",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={controls}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          position: "relative",
          width: W,
          height: H,
          transformStyle: "preserve-3d",
        }}
      >

        <div style={backFace} />

        <div style={topFace} />

        <div style={leftFace} />

        <div style={rightFace} />

        <div style={bottomFace} />

        <div style={frontFace}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 30%, transparent 55%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 75% 80%, rgba(0,0,0,0.22) 0%, transparent 60%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.logo}
          </div>
        </div>

        {item.dot && (
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

const Dock = ({ light, windowHidden = false, onRestore, onOpenResume }: DockProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const staticItems: DockItem[] = [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/AndrewL05",
      bgFrom: "#3a4148",
      bgTo: "#161b22",
      sideColor: "#0d1117",
      shadowColor: "rgba(0,0,0,0.7)",
      logo: <GitHubLogo />,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/andrew-li05",
      bgFrom: "#3aa3e0",
      bgTo: "#0a66c2",
      sideColor: "#064a8c",
      shadowColor: "rgba(10,102,194,0.55)",
      logo: <LinkedInLogo />,
    },
    {
      id: "resume",
      label: "Resume",
      onClick: onOpenResume,
      bgFrom: "#f07868",
      bgTo: "#c03020",
      sideColor: "#8a1e10",
      shadowColor: "rgba(192,48,32,0.55)",
      logo: <ResumeLogo />,
    },
  ];

  const restoreItem: DockItem = {
    id: "restore",
    label: "Portfolio",
    onClick: onRestore,
    dot: true,
    bgFrom: "#b080fc",
    bgTo: "#5b21b6",
    sideColor: "#3b0e8c",
    shadowColor: "rgba(91,33,182,0.6)",
    logo: <PortfolioLogo />,
  };

  const dockClass = light
    ? "bg-white/30 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    : "bg-white/[0.07] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]";

  const tooltipClass = light ? "bg-black/80 text-white" : "bg-white/90 text-black";

  const renderItem = (item: DockItem, index: number) => {
    const isHovered = hovered === item.id;

    const slab = (
      <div className="relative flex flex-col items-center">
        <div
          className={`absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap pointer-events-none ${tooltipClass}`}
          style={{
            opacity: isHovered ? 1 : 0,
            transform: `translateX(-50%) translateY(${isHovered ? 0 : 4}px)`,
            transition: "opacity 120ms ease, transform 120ms ease",
          }}
        >
          {item.label}
        </div>

        <IconSlab
          item={item}
          index={index}
          isHovered={isHovered}
          onEnter={() => setHovered(item.id)}
          onLeave={() => setHovered(null)}
        />
      </div>
    );

    if (item.onClick) {
      return (
        <button
          key={item.id}
          onClick={item.onClick}
          className="focus-visible:outline-none"
        >
          {slab}
        </button>
      );
    }

    return (
      <a
        key={item.id}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:outline-none"
      >
        {slab}
      </a>
    );
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-end gap-3 px-4 pr-6 py-3 rounded-2xl border backdrop-blur-2xl transition-colors duration-300 ${dockClass}`}
      >
        <AnimatePresence>
          {windowHidden && onRestore && (
            <motion.div
              key="restore"
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto", transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 0.5, width: 0, transition: { duration: 0.18 } }}
              className="overflow-visible"
            >
              {renderItem(restoreItem, 0)}
            </motion.div>
          )}
        </AnimatePresence>

        {staticItems.map((item, i) =>
          renderItem(item, windowHidden ? i + 1 : i)
        )}
      </div>
    </div>
  );
};

export default Dock;