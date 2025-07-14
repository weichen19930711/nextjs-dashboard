/**
 * 当与映射类型结合时，keyof类型会变得特别有用
 */
type PointXY = { x: number; y: number };
type P = keyof PointXY; // same type as type P = "x" | "y":

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number
const arrayishItem: Arrayish = { 1: '' };

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // string | number
const mapishItem: Mapish = { '1': false, 2: false };
