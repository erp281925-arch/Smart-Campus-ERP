@@ .. @@
const cseKStudents = Array.from({ length: 40 }, (_, i) => {
      const isHighRisk = i < 5;
      const briScore = isHighRisk
        ? Math.floor(Math.random() * 15) + 25 // 25-39 range for high risk
        : Math.floor(Math.random() * 45) + 40; // 40-85 range for others

      let riskLevel;
      if (briScore < 40) {
        riskLevel = 'high';
      } else if (briScore < 70) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }

      return {
        id: `anon-${i + 1}`,
        briScore,
        trend: Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 50),
        riskLevel,
-        dataSharing: i < 5 ? true : i % 7 !== 0, // First 5 high risk students share data
+        dataSharing: i < 5 ? true : i % 3 !== 0, // More students deny data sharing
      };
    });

const cseDStudents = Array.from({ length: 38 }, (_, i) => {
      const isHighRisk = i < 3;
      const briScore = isHighRisk
        ? Math.floor(Math.random() * 10) + 30 // 30-39 range for high risk
        : Math.floor(Math.random() * 50) + 40; // 40-90 range for others

      let riskLevel;
      if (briScore < 40) {
        riskLevel = 'high';
      } else if (briScore < 70) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }

      return {
        id: `anon-${i + 41}`,
        briScore,
        trend: Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 60),
        riskLevel,
-        dataSharing: i < 3 ? true : i % 5 !== 0, // First 3 high risk students share data
+        dataSharing: i < 3 ? true : i % 4 !== 0, // More students deny data sharing
      };
    });