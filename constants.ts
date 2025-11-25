import { Plan, Horse, NavItem, SectionId } from './types';

export const APP_NAME = "KAZU HORSE TRAINING";

// ==========================================
// ★画像リンク自動変換機能
// ==========================================
/**
 * Google Driveの共有リンクを、Webサイトで直接表示できる形式に自動変換します。
 * 従来の export=view よりも安定して表示される thumbnail エンドポイントを使用します。
 */
const getOptimizedImageUrl = (url: string): string => {
  if (!url) return '';

  // 余計な空白を削除
  let cleanUrl = url.trim();

  // Google Driveのリンクかどうかをチェック
  if (cleanUrl.includes('drive.google.com') && cleanUrl.includes('/file/d/')) {
    try {
      // ID部分を抽出 (例: .../file/d/ABCDE123/view... -> ABCDE123)
      const id = cleanUrl.split('/file/d/')[1].split('/')[0];
      // サムネイル形式に変換 (sz=w2000 は幅2000pxで取得の意味。高画質で安定します)
      return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;
    } catch (e) {
      console.warn('Google Drive link conversion failed:', e);
      return cleanUrl; // 失敗したら元のURLを返す
    }
  }
  return cleanUrl; // Drive以外ならそのまま返す
};

// ==========================================
// ★ローカル画像自動読み込み
// ==========================================
/**
 * assets/local-images 配下に配置した画像ファイルをまとめて読み込み、
 * ファイル名（拡張子を除いた部分）をキーにして参照できるようにします。
 *
 * 例) assets/local-images/hero.jpg → resolveImage('hero')
 */
const localImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/*.{png,jpg,jpeg,webp,svg}',
  { eager: true }
);

const LOCAL_IMAGE_MAP = Object.entries(localImageModules).reduce<Record<string, string>>(
  (acc, [path, module]) => {
    const fileName = path.split('/').pop() ?? '';
    const key = fileName.replace(/\.(png|jpe?g|webp)$/i, '').toLowerCase();
    acc[key] = module.default;
    return acc;
  },
  {}
);

const getLocalImage = (key: string): string => {
  if (!key) return '';
  return LOCAL_IMAGE_MAP[key.toLowerCase()] ?? '';
};

const resolveImage = (key: string, fallbackUrl = ''): string => {
  return getLocalImage(key) || getOptimizedImageUrl(fallbackUrl);
};

const resolveImageArray = (keys: string[], fallbackUrls: string[] = []): string[] => {
  return keys.map((key, idx) => resolveImage(key, fallbackUrls[idx] ?? ''));
};

// ==========================================
// ★写真・ロゴの設定エリア
// ==========================================
// 画像ファイルを assets/local-images に配置すると、自動的に同名キーで読み込まれます。
// 例) hero.jpg → resolveImage('hero') としてヒーロー背景に使用。

const HORSE_IMAGE_KEYS = ['horse-1', 'horse-2', 'horse-3', 'horse-4', 'horse-5', 'horse-6'];
const ABOUT_GALLERY_KEYS = [
  'about-gallery-1',
  'about-gallery-2',
  'about-gallery-3',
  'about-gallery-4',
  'about-gallery-5',
  'about-gallery-6',
  'about-gallery-7'
];

export const IMAGES = {
  // サイトのロゴ画像 (KAZロゴ)
  logo: resolveImage('logo', 'https://drive.google.com/file/d/1f2KgXRF3LYODrgd0Mz2vDDQpgLqHXu-M/view?usp=sharing'),

  // トップページの大きな背景画像 (横長推奨)
  hero: resolveImage('hero', 'https://drive.google.com/file/d/1Vh4ynOLf0SIyAnFD93UgBzSIhlXw4g83/view?usp=sharing'),

  // 「About Us」セクションの画像 (縦長推奨)
  about: resolveImage('about'),

  // 馬の紹介 + 追加ギャラリー画像
  horses: resolveImageArray(HORSE_IMAGE_KEYS),

  // Aboutセクション用の追加ギャラリー画像
  aboutGallery: resolveImageArray(ABOUT_GALLERY_KEYS, [
    'https://drive.google.com/file/d/1Vh4ynOLf0SIyAnFD93UgBzSIhlXw4g83/view?usp=drive_link'
  ]),

  // プラン用の画像 - 各プランに適したシーン
  planImages: {
    trial: resolveImage('plan-trial'),
    horseCare: resolveImage('plan-horse-care'),
    lesson: resolveImage('plan-lesson')
  },

  // 地図エリアの代替画像
  map: resolveImage('map')
};

// 連絡先情報
export const CONTACT_INFO = {
  phone: '0575-72-6785',
  phoneLink: 'tel:0575726785', // 電話番号へのリンク（ハイフンなし）
  address: '〒501-5304 岐阜県郡上市高鷲町鮎立5434 (N.A.O.明野高原キャンプ場内)',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'ホーム', href: `#${SectionId.HOME}` },
  { label: 'ABOUT', href: `#${SectionId.ABOUT}` },
  { label: '料金プラン', href: `#${SectionId.PLANS}` },
  { label: '馬の紹介', href: `#${SectionId.HORSES}` },
  { label: 'アクセス', href: `#${SectionId.ACCESS}` },
];

export const PLANS: Plan[] = [
  {
    id: 'trial-short',
    title: '体験乗馬 (ショート)',
    price: '¥3,000 / 15分',
    features: [
      '馬に慣れるためのコース',
      'スタッフの指導付きで自分で操作',
      '引き馬ではありません',
      'ハイシーズンは+¥1,000',
      '別途保険料 ¥300'
    ],
    recommendedFor: 'まずは馬に触れてみたい方、少しだけ乗ってみたい方',
    imageUrl: IMAGES.planImages.trial
  },
  {
    id: 'trial-long',
    title: '体験乗馬 (ロング)',
    price: '¥7,000 / 45分',
    features: [
      '軽い駈歩（かけあし）まで挑戦',
      '馬の手入れ体験も可能',
      'マンツーマン指導',
      'ハイシーズンは+¥1,000',
      '別途保険料 ¥300'
    ],
    recommendedFor: 'しっかり乗ってみたい方、走ってみたい方',
    isPopular: true,
    imageUrl: IMAGES.planImages.horseCare
  },
  {
    id: 'lesson-ticket',
    title: 'レッスン回数券 (4回)',
    price: '¥20,000 / 4回分',
    features: [
      '1回あたり45分のレッスン',
      'マンツーマン指導',
      '土日利用は ¥23,000',
      '有効期限あり',
      '本格的に技術を習得'
    ],
    recommendedFor: '継続して通いたい方、ウエスタン乗馬を極めたい方',
    imageUrl: IMAGES.planImages.lesson
  }
];

export const HORSES: Horse[] = [
  {
    id: 'h1',
    name: 'ウエスタンホース',
    breed: 'クォーターホース種など',
    description: 'カズホースの馬たちは、ウエスタン競技で活躍できるよう丁寧に調教されています。とても穏やかで人懐っこく、初心者の方でも安心して騎乗できます。',
    imageUrl: IMAGES.horses[0]
  },
  {
    id: 'h2',
    name: '和種馬・ポニー',
    breed: '道産子・木曽馬・ポニー',
    description: '北海道和種（道産子）や木曽馬など、日本の在来馬も在籍した実績があります。小柄で我慢強い性格の馬たちは、子供たちの良きパートナーです。',
    imageUrl: IMAGES.horses[1]
  },
  {
    id: 'h3',
    name: '仔馬たち',
    breed: '生産馬',
    description: '当クラブでは繁殖・育成も行っています。時期によっては、元気いっぱいに放牧場を駆け回る仔馬たちの姿を見ることができるかもしれません。',
    imageUrl: IMAGES.horses[2]
  }
];

export const SYSTEM_INSTRUCTION = `
あなたは岐阜県郡上市高鷲町にある乗馬クラブ「カズホーストレーニング (Kazu Horse Training)」のAIコンシェルジュです。
以下の情報を元に、ユーザーからの質問に親しみやすく、ウエスタン乗馬の魅力を伝えながら回答してください。

【クラブ概要】
- 場所: 岐阜県郡上市高鷲町鮎立5434「N.A.O.明野高原キャンプ場」内。
- 標高: 約1,000mの高原。自然豊か。
- スタイル: ウエスタンスタイル。
- モットー: 「馬とのコミュニケーションを大切に、人と馬が一対一で向き合う楽しさを伝える」。
- 代表: 川島 種朗（かわしま かずお）。元ブリティッシュインストラクターで、現在はウエスタン流のナチュラルホースマンシップを指導。

【サービス・料金 (税込)】
- 体験乗馬ショート(15分): 3,000円 (ハイシーズン 4,000円)。自分で手綱を持つ。
- 体験乗馬ロング(45分): 7,000円 (ハイシーズン 8,000円)。速歩〜軽い駈歩まで。
- 引き馬: 1周 1,000円 (親子乗り +500円)。
- 4回レッスン券: 20,000円 (土日 23,000円)。
- ジュニアスクール: 10回 23,000円 (小中学生)。
- 別途保険料: 300円。
- 支払い: 現金推奨。

【特徴・施設】
- 施設: 屋外馬場（砂地）、ラウンドペン（丸馬場）。※屋内馬場はありません。
- 雨天時: 屋内馬場がないため、レッスンの実施は要相談・スケジュール調整となります。
- 特徴: 初心者でも「引き馬」ではなく自分で操作する楽しみを教えます。マンツーマンで丁寧。
- 宿泊: キャンプ場のコテージ等に宿泊しての合宿利用も可能。
- 駐車場: 無料あり。

【アクセス】
- 車: 東海北陸自動車道「高鷲IC」から5〜10分。
- 公共交通機関: 長良川鉄道「白鳥高原駅」からタクシー（徒歩は不可）。

【トーン＆マナー】
- 丁寧語（です・ます）で、アットホームな雰囲気を出す。
- 「ウエスタン乗馬は鞍が深くて安定するので初心者でも安心ですよ」といった補足を入れる。
- 質問の答えがわからない場合は「詳しいスケジュールや予約状況はお電話（0575-72-6785）にてお問い合わせください」と案内する。
`;