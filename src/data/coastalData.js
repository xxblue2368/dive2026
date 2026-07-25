// CoastMorph AI - Coastal Erosion Data & Factor Attribution Model

export const COASTAL_REGIONS = [
  {
    id: "gangneung",
    name: "동해안 강릉 안목-경포",
    locationName: "Gangneung Anmok Beach, South Korea",
    coords: [37.7715, 128.9485],
    zoom: 14,
    erosionRate: "3.2m / 년",
    riskLevel: "CRITICAL",
    riskColor: "#FF4757",
    description: "항만 방파제 설치로 인한 도사(모래) 이송 차단과 기후변화 파랑 에너지 증대로 모래사장 급격히 소실.",
    historicalTimeline: [
      { year: 1995, width: 85, photoText: "1995년: 넓은 백사장 (폭 85m), 자연 식생 보존" },
      { year: 2010, width: 54, photoText: "2010년: 남항진 방파제 확충 후 연안류 침식 가속 (폭 54m)" },
      { year: 2026, width: 28, photoText: "2026년 현재: 백사장 심각 손실 (폭 28m), 도로 침수 위험" },
      { year: 2050, width: 9,  photoText: "2050년 예측: 백사장 소멸 위험 (폭 9m 예측)" }
    ],
    attributionFactors: [
      { name: "방파제·해안구조물 (Jetties & Breakwaters)", percent: 42, color: "#FF4757", category: "human", icon: "Building2" },
      { name: "하천 토사 유입 감소 (Upstream Sediment Trap)", percent: 23, color: "#FFA502", category: "river", icon: "Waves" },
      { name: "해수면 상승 & 기후변화 (Sea Level Rise)", percent: 20, color: "#00F2FE", category: "climate", icon: "TrendingUp" },
      { name: "이상 파랑 & 태풍 에너지 (Extreme Surges)", percent: 12, color: "#70A1FF", category: "storm", icon: "Wind" },
      { name: "해안 사구/식생 손실 (Dune Degradation)", percent: 3, color: "#2ED573", category: "eco", icon: "Trees" }
    ],
    stats: {
      totalAreaLost: "124,500 m²",
      economicImpact: "$48.5M (약 670억원)",
      vulnerableBuildings: "38개 상가 및 도로",
      dominantFactor: "방파제에 의한 표사 이동 차단 (42%)"
    },
    recommendation: "수중 잠제(Breakwater Reef) 설치 및 하천 토사 바이패싱 시스템 구축 긴급 필요"
  },
  {
    id: "saemangeum",
    name: "서해안 새만금 연안",
    locationName: "Saemangeum Coast, Yellow Sea, SK",
    coords: [35.8450, 126.5420],
    zoom: 12,
    erosionRate: "2.8m / 년 (인근 침식)",
    riskLevel: "HIGH",
    riskColor: "#FFA502",
    description: "세계 최장 방조제 건설로 인한 조류 유속 변형, 인근 연안 갯벌 침식과 내측 토사 퇴적 비대칭 현상.",
    historicalTimeline: [
      { year: 1995, width: 95, photoText: "1995년: 광활한 자연 갯벌 및 대형 조류 유입" },
      { year: 2010, width: 70, photoText: "2010년: 방조제 완공 후 외해 파랑 수중 에너지 집중" },
      { year: 2026, width: 45, photoText: "2026년 현재: 외곽 해안 수심 깊어짐 & 인근 침식 심화" },
      { year: 2050, width: 22, photoText: "2050년 예측: 갯벌 유실율 60% 상회 가능성" }
    ],
    attributionFactors: [
      { name: "방조제 및 매립 구조물 (Seawalls & Reclamation)", percent: 58, color: "#FF4757", category: "human", icon: "Building2" },
      { name: "조류 및 수력학 변화 (Tidal Hydrodynamics)", percent: 22, color: "#00F2FE", category: "tide", icon: "Activity" },
      { name: "하천 토사 유입 차단 (River Damming)", percent: 12, color: "#FFA502", category: "river", icon: "Waves" },
      { name: "해수면 상승 (Global SLR)", percent: 5, color: "#70A1FF", category: "climate", icon: "TrendingUp" },
      { name: "이상 태풍 (Extreme Weather)", percent: 3, color: "#A4B0BE", category: "storm", icon: "Wind" }
    ],
    stats: {
      totalAreaLost: "310,000 m²",
      economicImpact: "$82.0M (약 1,130억원)",
      vulnerableBuildings: "어항 및 수산 양식장",
      dominantFactor: "대형 방조제에 의한 조류 통로 변경 (58%)"
    },
    recommendation: "해수 유통량 확대 및 조류 파열 완화 수중 댐 구획화"
  },
  {
    id: "haeundae",
    name: "부산 해운대 해수욕장",
    locationName: "Haeundae Beach, Busan, SK",
    coords: [35.1587, 129.1604],
    zoom: 15,
    erosionRate: "1.9m / 년",
    riskLevel: "MODERATE",
    riskColor: "#ECCC68",
    description: "해안가 마천루 건물군 반사파와 태풍 고파랑 에너지 결합으로 모래 투입 없이는 침식이 지속되는 인공 유지 백사장.",
    historicalTimeline: [
      { year: 1995, width: 70, photoText: "1995년: 모래 유실 진행 중인 도심 해수욕장" },
      { year: 2010, width: 40, photoText: "2010년: 태풍 힌남노 및 파랑으로 백사장 폭 40m 축소" },
      { year: 2026, width: 55, photoText: "2026년 현재: 매년 수십만m³ 양빈(모래 투입)으로 폭 55m 유지" },
      { year: 2050, width: 25, photoText: "2050년 예측: 양빈 중단 시 폭 25m 미만 축소 예측" }
    ],
    attributionFactors: [
      { name: "도심 고층 건물 반사파 (Urban Reflection Waves)", percent: 35, color: "#FF6B81", category: "human", icon: "Building2" },
      { name: "태풍 및 고파랑 에너지 (Typhoon Surge)", percent: 30, color: "#FF4757", category: "storm", icon: "Wind" },
      { name: "해수면 상승 (Sea Level Rise)", percent: 20, color: "#00F2FE", category: "climate", icon: "TrendingUp" },
      { name: "하천 모래 차단 (Sand Trapping)", percent: 10, color: "#FFA502", category: "river", icon: "Waves" },
      { name: "해안 식생 상실 (Vegetation Loss)", percent: 5, color: "#2ED573", category: "eco", icon: "Trees" }
    ],
    stats: {
      totalAreaLost: "89,000 m² (양빈 투입 전 기준)",
      economicImpact: "$62.0M (관광 가치 및 양빈 비용)",
      vulnerableBuildings: "해안 산책로 및 호안 도로",
      dominantFactor: "도심 반사파 & 태풍 파랑 에너지 (65%)"
    },
    recommendation: "지능형 돌제(Groyne) 배치 및 양류 방지 수중 생태 제방 복원"
  },
  {
    id: "miami",
    name: "미국 마이애미 비치",
    locationName: "Miami Beach, Florida, USA",
    coords: [25.7907, -80.1300],
    zoom: 13,
    erosionRate: "4.1m / 년",
    riskLevel: "CRITICAL",
    riskColor: "#FF4757",
    description: "석회암 기반암을 통한 해수 침투와 대서양 허리케인 폭풍 해일로 최고 수준의 해수면 상승 및 침식 피해 지역.",
    historicalTimeline: [
      { year: 1995, width: 90, photoText: "1995년: 플로리다 대표 백사장" },
      { year: 2010, width: 62, photoText: "2010년: 만조 시 도로 침수(King Tide) 일상화" },
      { year: 2026, width: 35, photoText: "2026년 현재: 펌프장 및 양빈 사업으로 미봉책 대응 중" },
      { year: 2050, width: 5,  photoText: "2050년 예측: 해수면 +45cm 상승 시 90% 침수 위험" }
    ],
    attributionFactors: [
      { name: "기후변화 & 해수면 상승 (Sea Level Rise)", percent: 52, color: "#00F2FE", category: "climate", icon: "TrendingUp" },
      { name: "허리케인 & 폭풍 해일 (Hurricane Surge)", percent: 28, color: "#FF4757", category: "storm", icon: "Wind" },
      { name: "초고층 과도 개발 (Over-Development)", percent: 12, color: "#FF6B81", category: "human", icon: "Building2" },
      { name: "맹그로브 자연방벽 제거 (Mangrove Loss)", percent: 8, color: "#2ED573", category: "eco", icon: "Trees" }
    ],
    stats: {
      totalAreaLost: "450,000 m²",
      economicImpact: "$3.5B (약 4조 8,000억원)",
      vulnerableBuildings: "아르데코 호스피탈리티 지구",
      dominantFactor: "지구 온난화에 따른 글로벌 해수면 상승 (52%)"
    },
    recommendation: "해수 배수 펌프망 확장 및 입체적 방수 장벽(Sea Wall) 구축"
  },
  {
    id: "tuvalu",
    name: "투발루 환초 해안",
    locationName: "Funafuti, Tuvalu Atoll",
    coords: [-8.5167, 179.2167],
    zoom: 13,
    erosionRate: "5.5m / 년",
    riskLevel: "EXTREME CRITICAL",
    riskColor: "#FF0000",
    description: "해수면 상승 및 백화 현상으로 인한 산호초 파괴. 국토 전체 침수 직전의 글로벌 기후위기 최전선.",
    historicalTimeline: [
      { year: 1995, width: 60, photoText: "1995년: 환초 섬 내부 안정적 주거지" },
      { year: 2010, width: 35, photoText: "2010년: 산호초 파괴로 외부 파도 직격" },
      { year: 2026, width: 15, photoText: "2026년 현재: 최고 고도 4m 미만, 만조 시 국토 50% 침수" },
      { year: 2050, width: 0,  photoText: "2050년 예측: 국토 수몰 위험성 90%" }
    ],
    attributionFactors: [
      { name: "글로벌 해수면 상승 (Global Sea Level Rise)", percent: 65, color: "#00F2FE", category: "climate", icon: "TrendingUp" },
      { name: "산호초 사멸 & 방파기능 상실 (Coral Bleaching)", percent: 22, color: "#FFA502", category: "eco", icon: "Trees" },
      { name: "태풍 & 킹타이드 (Cyclone & King Tides)", percent: 10, color: "#FF4757", category: "storm", icon: "Wind" },
      { name: "인공 토지 변경 (Land Alteration)", percent: 3, color: "#A4B0BE", category: "human", icon: "Building2" }
    ],
    stats: {
      totalAreaLost: "185,000 m² (섬 전체의 18%)",
      economicImpact: "국가 존재 가치 및 이주 비용 $1.2B",
      vulnerableBuildings: "국가 전체 인프라 및 주거지",
      dominantFactor: "해수면 상승 및 해양 산성화 산호 사멸 (87%)"
    },
    recommendation: "국제 탄소 배출 규제 연대 및 메타버스/디지털 트윈 국토 보존 프로젝트"
  }
];

// Physical calculation engine for What-If Simulation
export function calculateWhatIfImpact(baseRegion, tempRise, seawallHeight, sedimentSupplied) {
  // Base parameters
  const baseRate = parseFloat(baseRegion.erosionRate); // e.g. 3.2
  
  // Temp rise (+0.5 to +3.5 °C): Increases sea level rise & storm energy exponent
  const tempMultiplier = 1 + (tempRise - 1.0) * 0.45;
  
  // Seawall height (+0m to +5m): Reduces erosion up to 60%
  const seawallReduction = Math.min(0.65, seawallHeight * 0.12);
  
  // Sediment replenishment (0% to 100%): Offsets up to 70% erosion
  const sedimentReduction = (sedimentSupplied / 100) * 0.70;
  
  // Net predicted erosion rate (m/yr)
  let predictedRate = baseRate * tempMultiplier * (1 - seawallReduction) * (1 - sedimentReduction);
  predictedRate = Math.max(0.2, predictedRate);
  
  // 2050 land loss estimate (m)
  const yearsTo2050 = 24; // 2026 to 2050
  const landLostMeters = (predictedRate * yearsTo2050).toFixed(1);
  
  // Economic Risk Index (0-100)
  const riskIndex = Math.min(100, Math.round((predictedRate / 6.0) * 100));
  
  // Projected damage ($M)
  const baseDamage = parseFloat(baseRegion.stats.economicImpact.replace(/[^0-9.]/g, '')) || 50;
  const projectedDamageM = (baseDamage * (predictedRate / baseRate)).toFixed(1);

  return {
    predictedRate: predictedRate.toFixed(2),
    landLostMeters,
    riskIndex,
    projectedDamageM,
    statusText: riskIndex > 75 ? "위험 (CRITICAL)" : riskIndex > 45 ? "경고 (HIGH RISK)" : "안정적 (CONTROLLED)"
  };
}
