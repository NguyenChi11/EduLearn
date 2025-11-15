import localFont from "next/font/local";

export const gtEesti = localFont({
  src: [
    {
      path: "./Gt_Eesti/GT-Eesti-Display-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Gt_Eesti/GT-Eesti-Display-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Gt_Eesti/GT-Eesti-Display-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gt-eesti",
  display: "swap",
});

export const philosopher = localFont({
  src: [
    {
      path: "./Philosopher/Philosopher-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Philosopher/Philosopher-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Philosopher/Philosopher-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Philosopher/Philosopher-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-philosopher",
});

export const bricolageGrotesque = localFont({
  src: "./Bricolage_Grotesque/BricolageGrotesque-VariableFont.ttf",
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export const nvnCocogoose = localFont({
  src: [
    {
      path: "./NVNCocogoose/NVNCocogooseVintage-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nvn-cocogoose",
  display: "swap",
});
