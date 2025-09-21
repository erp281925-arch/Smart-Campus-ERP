// Mock data for dashboard charts and components

export const studentData = {
  briScore: 72,
  attendance: 85,
  avgMarks: 78,
  assignmentsOnTime: 92,
  sentiment: "positive",
  dataSharing: true, // Privacy consent for sharing data with advisors
  
  briHistory: [
    { month: 'Jan', score: 80 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 76 },
    { month: 'Jun', score: 72 }
  ],
  
  attendanceData: [
    { name: 'Present', value: 85, fill: '#22c55e' },
    { name: 'Absent', value: 15, fill: '#ef4444' }
  ],
  
  subjectMarks: [
    { subject: 'Mathematics', marks: 85 },
    { subject: 'Physics', marks: 78 },
    { subject: 'Chemistry', marks: 82 },
    { subject: 'English', marks: 75 },
    { subject: 'Computer Science', marks: 88 }
  ],
  
  assignments: [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Calculus Assignment',
      dueDate: '2024-09-15',
      status: 'pending',
      isOverdue: false
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Lab Report',
      dueDate: '2024-09-14',
      status: 'pending',
      isOverdue: false
    },
    {
      id: '3',
      subject: 'Computer Science',
      title: 'Algorithm Implementation',
      dueDate: '2024-09-16',
      status: 'completed',
      isOverdue: false
    }
  ]
};

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
        dataSharing: i < 5 ? true : i % 7 !== 0, // First 5 high risk students share data
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
        dataSharing: i < 3 ? true : i % 5 !== 0, // First 3 high risk students share data
      };
    });

export const classData = {
  'CSE-K': {
    avgBri: 68,
    highRiskCount: cseKStudents.filter(s => s.riskLevel === 'high').length,
    avgAttendance: 82,
    totalStudents: 40,
    complaintsCount: 3,
    
    briTrend: [
      { week: 'Week 1', score: 72 },
      { week: 'Week 2', score: 70 },
      { week: 'Week 3', score: 68 },
      { week: 'Week 4', score: 65 },
      { week: 'Week 5', score: 68 }
    ],
    
    riskDistribution: [
      { risk: 'Low', count: cseKStudents.filter(s => s.riskLevel === 'low').length, fill: '#22c55e' },
      { risk: 'Medium', count: cseKStudents.filter(s => s.riskLevel === 'medium').length, fill: '#f59e0b' },
      { risk: 'High', count: cseKStudents.filter(s => s.riskLevel === 'high').length, fill: '#ef4444' }
    ],
    
    students: cseKStudents,
  },
  
  'CSE-D': {
    avgBri: 75,
    highRiskCount: cseDStudents.filter(s => s.riskLevel === 'high').length,
    avgAttendance: 88,
    totalStudents: 38,
    complaintsCount: 1,
    
    briTrend: [
      { week: 'Week 1', score: 78 },
      { week: 'Week 2', score: 76 },
      { week: 'Week 3', score: 75 },
      { week: 'Week 4', score: 73 },
      { week: 'Week 5', score: 75 }
    ],
    
    riskDistribution: [
      { risk: 'Low', count: cseDStudents.filter(s => s.riskLevel === 'low').length, fill: '#22c55e' },
      { risk: 'Medium', count: cseDStudents.filter(s => s.riskLevel === 'medium').length, fill: '#f59e0b' },
      { risk: 'High', count: cseDStudents.filter(s => s.riskLevel === 'high').length, fill: '#ef4444' }
    ],
    
    students: cseDStudents,
  }
};

export const complaints = [
  {
    id: '1',
    text: 'Too much workload in mathematics course',
    timestamp: '2024-09-08 14:30',
    class: 'CSE-K',
    sentiment: 'negative'
  },
  {
    id: '2',
    text: 'Lab equipment needs maintenance',
    timestamp: '2024-09-07 16:45',
    class: 'CSE-D',
    sentiment: 'neutral'
  },
  {
    id: '3',
    text: 'Cafeteria food quality has improved',
    timestamp: '2024-09-06 12:20',
    class: 'CSE-K',
    sentiment: 'positive'
  }
];

export const counsellorReferrals = [
  {
    id: 'ref-001',
    studentId: 'HASHED-STU-001',
    realName: 'John Doe',
    briScore: 45,
    riskFactors: ['High assignment stress', 'Low attendance', 'Social isolation'],
    referredBy: 'Dr. Smith',
    referredDate: '2024-09-05',
    status: 'active',
    notes: 'Student showing signs of academic stress and social withdrawal'
  },
  {
    id: 'ref-002',
    studentId: 'HASHED-STU-002',
    realName: 'Jane Smith',
    briScore: 38,
    riskFactors: ['Other issues', 'Academic pressure', 'Social isolation'],
    referredBy: 'Dr. Johnson',
    referredDate: '2024-09-03',
    status: 'in-progress',
    notes: 'Multiple sessions completed, showing improvement'
  }
];

export const adminHighRiskStudents = [
  {
    id: 'HASHED-ADM-001',
    briScore: 35,
    class: 'CSE-K',
    lastUpdated: '2024-09-09'
  },
  {
    id: 'HASHED-ADM-002',
    briScore: 42,
    class: 'CSE-D',
    lastUpdated: '2024-09-08'
  },
  {
    id: 'HASHED-ADM-003',
    briScore: 38,
    class: 'CSE-K',
    lastUpdated: '2024-09-07'
  },
  {
    id: 'HASHED-ADM-004',
    briScore: 41,
    class: 'CSE-D',
    lastUpdated: '2024-09-06'
  },
  {
    id: 'HASHED-ADM-005',
    briScore: 36,
    class: 'CSE-K',
    lastUpdated: '2024-09-05'
  },
  {
    id: 'HASHED-ADM-006',
    briScore: 44,
    class: 'CSE-D',
    lastUpdated: '2024-09-04'
  }
];

export const chatMessages = [
  {
    id: '1',
    sender: 'Anon-001',
    message: 'Anyone struggling with the calculus assignment?',
    timestamp: '2024-09-09 10:30',
    sentiment: 'neutral'
  },
  {
    id: '2',
    sender: 'Anon-002',
    message: 'Yes, the integration problems are really challenging',
    timestamp: '2024-09-09 10:32',
    sentiment: 'negative'
  },
  {
    id: '3',
    sender: 'Anon-003',
    message: 'I found some helpful resources online, happy to share',
    timestamp: '2024-09-09 10:35',
    sentiment: 'positive'
  },
  {
    id: '4',
    sender: 'Anon-001',
    message: 'That would be great, thanks!',
    timestamp: '2024-09-09 10:36',
    sentiment: 'positive'
  }
];