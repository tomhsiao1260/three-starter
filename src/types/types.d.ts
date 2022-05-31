declare module 'lil-gui';

declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "*.glb?url" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: any;
  export default value;
}