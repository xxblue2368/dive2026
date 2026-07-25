// CoastMorph AI - Coastal Erosion Data & Factor Attribution Model

export const COASTAL_REGIONS = [
  {
    id: "songjeong",
    name: "부산 송정 해수욕장",
    locationName: "Songjeong Beach, Busan, SK",
    coords: [35.1786, 129.1997],
    zoom: 15,
    erosionRate: "1.9m / 년",
    riskLevel: "MODERATE",
    riskColor: "#ECCC68",
    description: "해안가 마천루 건물군 반사파와 태풍 고파랑 에너지 결합으로 모래 투입 없이는 침식이 지속되는 인공 유지 백사장.",
    historicalTimeline: [
      { year: 2015, width: 50.0, photoText: "2015년: 백사장 대규모 확장기 시작 (기준 백사장 폭 50m)" },
      { year: 2016, width: 54.75, photoText: "2016년: +5,700m² 유입 (해안선 +4.75m 전진)" },
      { year: 2017, width: 63.42, photoText: "2017년: +10,400m² 대규모 유입 (해안선 +8.67m 전진)" },
      { year: 2018, width: 56.92, photoText: "2018년: -7,800m² 유실 (해안선 -6.50m 후퇴, 1차 침식기)" },
      { year: 2019, width: 55.59, photoText: "2019년: -1,600m² 유실 (해안선 -1.33m 후퇴)" },
      { year: 2020, width: 66.17, photoText: "2020년: +12,700m² 대폭 복원 (해안선 +10.58m 전진 / 침식 제로)" },
      { year: 2021, width: 69.09, photoText: "2021년: +3,500m² 유입 (해안선 +2.92m 전진 / 10년 최고 정점)" },
      { year: 2022, width: 55.34, photoText: "2022년: -16,500m² 유실 (해안선 -13.75m 후퇴 / 💥 10년 최악 유실)" },
      { year: 2023, width: 55.44, photoText: "2023년: +100m² 변화 (동적 평형 상태)" },
      { year: 2024, width: 64.44, photoText: "2024년: +10,800m² 일시 회복 (해안선 +9.00m 전진)" },
      { year: 2025, width: 52.94, photoText: "2025년: -13,800m² 재침식 (해안선 -11.50m 후퇴 / 💥 치명적 재침식)" },
      { year: 2050, width: 25.0, photoText: "2050년 예측: 방치 시 백사장 폭 25m 미만 축소 예측" }
    ],
    timelinePhases: [
      {
        id: 1,
        title: "백사장 대규모 확장기 (전반기 성장)",
        period: "2015 ~ 2017년",
        type: "expansion",
        badge: "🟢 확장기",
        badgeColor: "#2ED573",
        summary: "2년에 걸쳐 총 16,100 m²의 모래가 쏟아져 들어오며 해안선이 바다 쪽으로 약 13.4m 전진한 백사장 확장 시기입니다.",
        yearlyData: [
          { yearRange: "2015-2016년", areaChange: "+5,700 m²", shorelineChange: "+4.75m 전진", note: "백사장 대규모 확장 시작" },
          { yearRange: "2016-2017년", areaChange: "+10,400 m²", shorelineChange: "+8.67m 전진", note: "전반기 가속 유입" }
        ]
      },
      {
        id: 2,
        title: "1차 유실 및 침식기",
        period: "2017 ~ 2019년",
        type: "erosion",
        badge: "🔴 1차 침식",
        badgeColor: "#FF4757",
        summary: "앞서 쌓였던 모래의 절반 이상(-9,400 m²)이 태풍과 고파랑으로 쓸려 나가며 해안선이 육지 쪽으로 후퇴한 1차 침식 국면입니다.",
        yearlyData: [
          { yearRange: "2017-2018년", areaChange: "-7,800 m²", shorelineChange: "-6.50m 후퇴", note: "태풍/고파랑 대규모 유실" },
          { yearRange: "2018-2019년", areaChange: "-1,600 m²", shorelineChange: "-1.33m 후퇴", note: "지속적 해안선 후퇴" }
        ]
      },
      {
        id: 3,
        title: "자연 복원 및 안착기 (최대 정점)",
        period: "2019 ~ 2021년",
        type: "recovery",
        badge: "🟢 최대 정점",
        badgeColor: "#00F2FE",
        summary: "10년 치 데이터 중 단 1픽셀의 침식도 없이 완벽하게 모래만 쌓인 이례적인 해(+12,700 m²)를 포함하여, 백사장이 가장 넓고 두텁게 안정화되었던 해변 기능의 최전성기입니다.",
        yearlyData: [
          { yearRange: "2019-2020년", areaChange: "+12,700 m²", shorelineChange: "+10.58m 전진 (침식 제로)", note: "단 1픽셀 침식도 없는 이례적 해" },
          { yearRange: "2020-2021년", areaChange: "+3,500 m²", shorelineChange: "+2.92m 전진", note: "백사장 최고 정점 전성기" }
        ]
      },
      {
        id: 4,
        title: "극단적 롤러코스터 및 침식 우위기",
        period: "2021 ~ 2025년",
        type: "rollercoaster",
        badge: "🔴 침식 우위",
        badgeColor: "#FFA502",
        summary: "1만 m² 이상의 대규모 유실과 대규모 회복이 매년 교차하는 극단적 변동성 시기입니다. 전반기 5년 동안 힘들게 쌓았던 모래를 후반기에 대부분 깎아먹으며 장기적 해안선 후퇴 위험이 심화되었습니다.",
        yearlyData: [
          { yearRange: "2021-2022년", areaChange: "-16,500 m²", shorelineChange: "-13.75m 후퇴", note: "💥 10년 중 최악의 유실" },
          { yearRange: "2022-2023년", areaChange: "+100 m²", shorelineChange: "0.00m (변화 없음)", note: "동적 평형 유지" },
          { yearRange: "2023-2024년", areaChange: "+10,800 m²", shorelineChange: "+9.00m 전진", note: "🌱 대규모 일시 회복" },
          { yearRange: "2024-2025년", areaChange: "-13,800 m²", shorelineChange: "-11.50m 후퇴", note: "💥 치명적 재침식" }
        ]
      }
    ],
    attributionFactors: [
      { name: "구간 누적 강수량 (mm)", percent: 30.15, color: "#00F2FE", category: "hydro", icon: "CloudRain" },
      { name: "촬영 순간 조위 (cm)", percent: 24.53, color: "#4FACFE", category: "tide", icon: "Waves" },
      { name: "연도별 최고 조위 (cm)", percent: 24.25, color: "#FFA502", category: "tide", icon: "TrendingUp" },
      { name: "구간 최대 유의파고 (m)", percent: 14.15, color: "#FF4757", category: "wave", icon: "Wind" },
      { name: "구간 누적 파랑에너지 (kW/m)", percent: 6.91, color: "#2ED573", category: "energy", icon: "Zap" }
    ],
    stats: {
      totalAreaLost: "89,000 m² (양빈 투입 전 기준)",
      economicImpact: "$62.0M (관광 가치 및 양빈 비용)",
      vulnerableBuildings: "해안 산책로 및 호안 도로",
      dominantFactor: "구간 누적 강수량 & 조위 변수 (78.93%)"
    },
    recommendation: "지능형 조위/파고 모니터링 연동 돌제(Groyne) 배치 및 양류 방지 수중 생태 제방 복원"
  }
];

// Random Forest Model 2026-2028 Prediction Dataset
export const RF_PREDICTION_DATA = [
  {
    year: 2026,
    input: {
      rainfall: 1717.5,
      maxWaveHeight: 5.53000021,
      waveEnergy: 15732.09961,
      peakTide: 219.26
    },
    rfRawPrediction: 0.8, // +0.8m (퇴적/전진)
    stdDev: 4.5, // 불확실성 표준편차 (4~5m)
    note: "누적 파랑에너지 극대 (15,732.1 kW/m)"
  },
  {
    year: 2027,
    input: {
      rainfall: 1971.6,
      maxWaveHeight: 4.269999981,
      waveEnergy: 13879.00024,
      peakTide: 284.69
    },
    rfRawPrediction: 2.3, // +2.3m (퇴적/전진)
    stdDev: 4.5,
    note: "구간 누적 강수량 최대 (1,971.6 mm)"
  },
  {
    year: 2028,
    input: {
      rainfall: 1291.0,
      maxWaveHeight: 5.590000153,
      waveEnergy: 13746.30005,
      peakTide: 353.57
    },
    rfRawPrediction: 0.0, // 0.0m (변화 없음)
    stdDev: 4.5,
    note: "최고 조위 폭증 (353.57 cm) 및 최대 유의파고 극대"
  }
];

// Random Forest Uncertainty-Adjusted Calculation Function
export function calculateRFPrediction(dataItem, alpha = 1.0) {
  const raw = dataItem.rfRawPrediction;
  const std = dataItem.stdDev;
  // Uncertainty subtracted to reflect lower-bound erosion risk
  const adjusted = raw - (alpha * std);
  
  return {
    raw: raw > 0 ? `+${raw.toFixed(1)}m` : `${raw.toFixed(1)}m`,
    adjustedVal: parseFloat(adjusted.toFixed(1)),
    adjustedText: adjusted > 0 ? `+${adjusted.toFixed(1)}m (전진)` : adjusted === 0 ? `0.0m (변화없음)` : `${adjusted.toFixed(1)}m (후퇴/침식)`,
    isErosion: adjusted < 0,
    statusText: adjusted < -3.5 ? "💥 대규모 침식 위험" : adjusted < 0 ? "🔴 침식 경고" : "🟢 안정적"
  };
}

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

