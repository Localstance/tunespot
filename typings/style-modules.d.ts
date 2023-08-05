declare module "*.less" {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.png' {
  const src: string;
  export default src;
}