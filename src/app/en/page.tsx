import ShowcaseHeader from "@/components/sites/slots-ref/sections/home/ShowcaseHeader";
import ProductTiles from "@/components/sites/slots-ref/sections/home/ProductTiles";
import TopEvents from "@/components/sites/slots-ref/sections/home/TopEvents";
import PromoStrip from "@/components/sites/slots-ref/sections/home/PromoStrip";
import GamesShowcase from "@/components/sites/slots-ref/sections/home/GamesShowcase";
import CyberShowcase from "@/components/sites/slots-ref/sections/home/CyberShowcase";
import BonusCards from "@/components/sites/slots-ref/sections/home/BonusCards";
import {
  HOME_BANNERS,
  HOME_PRODUCTS,
  HOME_EVENTS,
  HOME_GAMES,
  HOME_ESPORTS,
  HOME_BONUS_CARDS,
} from "@/data/home";

export const metadata = {
  title: "SLOTSHUB — Sports Betting & Online Casino",
  description: "Sports betting, live casino, slots and more.",
};

export default function HomePage() {
  return (
    <>
      {/* y=112: 活动轮播 + 首充面板 + 3 个 CTA */}
      <ShowcaseHeader banners={HOME_BANNERS} />

      {/* y=526: 产品入口块 */}
      <ProductTiles products={HOME_PRODUCTS} />

      {/* y=662: 热门赛事双行 */}
      <TopEvents events={HOME_EVENTS} />

      {/* y=1163: 横条推广 */}
      <PromoStrip
        title="SPECIAL OFFER FOR NEW PLAYERS"
        subtitle="Register now and claim your welcome bonus of up to 9888 MYR"
        cta="REGISTER NOW"
        href="/en/registration"
      />

      {/* y=1298: 欢迎块 + 游戏 2×2 */}
      <GamesShowcase games={HOME_GAMES} />

      {/* y=1757: 电竞轮播 */}
      <CyberShowcase events={HOME_ESPORTS} />

      {/* y=2303: 奖金卡片 */}
      <BonusCards cards={HOME_BONUS_CARDS} />
    </>
  );
}
