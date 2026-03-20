import { GROUP_SKILL, SERIES_SKILL } from "@/global/data/skillData";

type SkillKeyType = "series" | "group";

export function normalizeSkill(skill: string | null, key: SkillKeyType) {
  const skillList = key === "series" ? SERIES_SKILL : GROUP_SKILL;

  if (skill === null) {
    return "유효 옵션"
  }

  if (!skillList.includes(skill)) {
    return "유효 옵션"
  }
  
  return skill;
}