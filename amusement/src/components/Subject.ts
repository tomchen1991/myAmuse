/*
 * @Date: 2023-04-04 17:27:16
 * @LastEditors: 陈子健
 * @LastEditTime: 2023-10-16 14:53:23
 * @FilePath: /amusement/src/components/Subject.ts
 */
export interface Subject {
  id?: string;
  score: number;
  time: string;
  name: string;
  article: string;
  platform?: string;
  otherType?: string;
}