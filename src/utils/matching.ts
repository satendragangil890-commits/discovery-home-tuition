import { Tutor, MatchScoreResult } from '../types';

export interface MatchingCriteria {
  studentClass?: string;
  board?: string;
  subjects?: string[];
  area?: string;
  tuitionMode?: string;
  preferredTime?: string;
}

export function calculateTutorMatch(tutor: Tutor, criteria: MatchingCriteria): MatchScoreResult {
  let score = 30; // base qualification score
  const reasons: string[] = [];

  // 1. Subject match (Priority 1: up to +35 pts)
  if (criteria.subjects && criteria.subjects.length > 0) {
    const hasAllSubjects = criteria.subjects.includes('All Subjects');
    const matchedSubs = tutor.subjects.filter((sub) =>
      criteria.subjects!.some((s) => s.toLowerCase() === sub.toLowerCase() || s === 'All Subjects' || sub === 'All Subjects')
    );
    if (hasAllSubjects || matchedSubs.length > 0) {
      score += 35;
      reasons.push(hasAllSubjects ? 'Covers All Primary Subjects' : `Subject Match (${matchedSubs.slice(0, 2).join(', ')})`);
    }
  }

  // 2. Class match (Priority 2: up to +25 pts)
  if (criteria.studentClass) {
    const classMatched = tutor.classes.some(
      (c) => c.toLowerCase() === criteria.studentClass!.toLowerCase()
    );
    if (classMatched) {
      score += 25;
      reasons.push(`Teaches ${criteria.studentClass}`);
    }
  }

  // 3. Board match (Priority 3: up to +15 pts)
  if (criteria.board) {
    const boardMatched = tutor.boards.some(
      (b) => b.toLowerCase() === criteria.board!.toLowerCase()
    );
    if (boardMatched) {
      score += 15;
      reasons.push(`${criteria.board} Board Expert`);
    }
  }

  // 4. Location match (Priority 4: up to +15 pts)
  if (criteria.area) {
    const isAllAreas = criteria.area.includes('All') || tutor.teachingAreas.includes('All Areas in Orai');
    const areaMatched = isAllAreas || tutor.teachingAreas.some((a) => a.toLowerCase() === criteria.area!.toLowerCase());
    if (areaMatched) {
      score += 15;
      reasons.push(`Available in ${criteria.area}`);
    }
  }

  // 5. Tuition Mode match
  if (criteria.tuitionMode) {
    const modeMatched = tutor.tuitionModes.some(
      (m) => m.toLowerCase().includes(criteria.tuitionMode!.toLowerCase())
    );
    if (modeMatched) {
      score += 5;
    }
  }

  // 6. Experience & Rating boost
  if (tutor.experienceYears >= 5) {
    score += 5;
    reasons.push(`${tutor.experienceYears}+ Yrs Exp`);
  }
  if (tutor.rating >= 4.8) {
    score += 5;
  }

  // Normalize max score to 99%
  const finalScore = Math.min(Math.round(score), 99);

  return {
    tutor,
    score: Math.max(finalScore, 65), // minimum sensible baseline
    reasons: reasons.slice(0, 3),
  };
}

export function getRankedTutors(tutors: Tutor[], criteria: MatchingCriteria): MatchScoreResult[] {
  // Only active/verified tutors for public listing by default
  const activeTutors = tutors.filter((t) => t.status === 'Active' || t.status === 'Verified');
  const scored = activeTutors.map((tutor) => calculateTutorMatch(tutor, criteria));
  return scored.sort((a, b) => b.score - a.score || b.tutor.rating - a.tutor.rating);
}
