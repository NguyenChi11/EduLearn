export type ReminderFrequency = "none" | "daily" | "weekly";
export type DefaultSort = "popular" | "rating" | "title-asc";

export interface CourseSettings {
  emailNotifications: boolean;
  lessonReminder: ReminderFrequency;
  marketingEmails: boolean;
  autoPlayNextLesson: boolean;
  showSubtitlesByDefault: boolean;
  defaultSort: DefaultSort;
  weeklyLessonsGoal: number;
  weeklyMinutesGoal: number;
}


