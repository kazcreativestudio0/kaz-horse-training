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
// ★ローカル画像自動読み込み（フォルダ別）
// ==========================================
/**
 * 各フォルダから画像を自動読み込みします。
 * フォルダに画像を入れるだけで自動的に反映されます。
 */

// 各フォルダから静的に画像を読み込み（ビルド時に解析されるため、静的パスが必要）
const heroImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/hero/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const logoImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/logo/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const aboutImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/about/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const horsesImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/horses/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const plansImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/plans/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const mapsImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/maps/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const galleryImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/gallery/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

// 各フォルダから最初の画像を取得する関数
const getFirstImage = (modules: Record<string, { default: string }>): string => {
  const images = Object.values(modules).map((m: { default: string }) => m.default).filter(Boolean);
  return images.length > 0 ? images[0] : '';
};

// フォルダ内のすべての画像をファイル名順で取得する関数
const getAllImages = (modules: Record<string, { default: string }>): string[] => {
  return Object.entries(modules)
    .map(([path, module]: [string, { default: string }]) => ({
      path,
      url: module.default,
      fileName: path.split('/').pop() ?? ''
    }))
    .filter(item => item.url) // 空のURLを除外
    .sort((a, b) => a.fileName.localeCompare(b.fileName, 'ja', { numeric: true }))
    .map(item => item.url);
};

// 後方互換性のため、ルートフォルダからも読み込む（既存の画像がある場合に備えて）
const localImageModules = import.meta.glob<{ default: string }>(
  './assets/local-images/*.{png,jpg,jpeg,webp,svg,avif,JPG,PNG}',
  { eager: true }
) as Record<string, { default: string }>;

const LOCAL_IMAGE_MAP = Object.entries(localImageModules).reduce<Record<string, string>>(
  (acc, [path, module]: [string, { default: string }]) => {
    const fileName = path.split('/').pop() ?? '';
    const key = fileName.replace(/\.(png|jpe?g|webp|svg|avif|JPG|PNG)$/i, '').toLowerCase();
    acc[key] = module.default;
    return acc;
  },
  {}
);

/**
 * ギャラリーフォルダ内のすべての画像を自動読み込み
 * assets/local-images/gallery/ フォルダ内の画像を自動的に取得して、ファイル名順にソート
 */
const GALLERY_IMAGES = getAllImages(galleryImageModules);

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

// フォルダから直接読み込む関数（優先的に使用）
const resolveImageFromFolder = (modules: Record<string, { default: string }>, fallbackKey: string = '', fallbackUrl: string = ''): string => {
  const folderImage = getFirstImage(modules);
  if (folderImage) return folderImage;
  return resolveImage(fallbackKey, fallbackUrl);
};

// フォルダ内でファイル名に特定の文字列を含む画像を取得する関数
const getImageByKeyword = (modules: Record<string, { default: string }>, keyword: string, fallbackKey: string = '', fallbackUrl: string = ''): string => {
  // ファイル名にキーワードを含む画像を検索
  const matched = Object.entries(modules).find(([path]) => {
    const fileName = path.split('/').pop() ?? '';
    return fileName.toLowerCase().includes(keyword.toLowerCase());
  });
  
  if (matched) return matched[1].default;
  
  // 見つからない場合、最初の画像またはフォールバック
  const folderImage = getFirstImage(modules);
  if (folderImage) return folderImage;
  return resolveImage(fallbackKey, fallbackUrl);
};

const resolveImageArrayFromFolder = (modules: Record<string, { default: string }>, fallbackKeys: string[] = [], fallbackUrls: string[] = []): string[] => {
  const folderImages = getAllImages(modules);
  if (folderImages.length > 0) return folderImages;
  return resolveImageArray(fallbackKeys, fallbackUrls);
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
  // logo/ フォルダに入れた画像が自動的に使用されます
  logo: resolveImageFromFolder(logoImageModules, 'logo', 'https://drive.google.com/file/d/1f2KgXRF3LYODrgd0Mz2vDDQpgLqHXu-M/view?usp=sharing'),

  // トップページの大きな背景画像 (横長推奨)
  // hero/ フォルダに入れた画像が自動的に使用されます
  hero: resolveImageFromFolder(heroImageModules, 'hero', 'https://drive.google.com/file/d/1Vh4ynOLf0SIyAnFD93UgBzSIhlXw4g83/view?usp=sharing'),

  // 「About Us」セクションの画像 (縦長推奨)
  // about/ フォルダに入れた画像が自動的に使用されます
  about: resolveImageFromFolder(aboutImageModules, 'about'),

  // 馬の紹介 + 追加ギャラリー画像
  // horses/ フォルダ内の画像が自動的に使用されます（ファイル名順）
  horses: resolveImageArrayFromFolder(horsesImageModules, HORSE_IMAGE_KEYS),

  // Aboutセクション用の追加ギャラリー画像
  // gallery/ フォルダ内の画像を自動的に読み込み（フォルダに入れるだけで反映されます）
  // フォールバック: 個別指定のキーまたはGoogle Driveリンク
  aboutGallery: GALLERY_IMAGES.length > 0 
    ? GALLERY_IMAGES 
    : resolveImageArray(ABOUT_GALLERY_KEYS, [
        'https://drive.google.com/file/d/1Vh4ynOLf0SIyAnFD93UgBzSIhlXw4g83/view?usp=drive_link'
      ]),

  // プラン用の画像 - 各プランに適したシーン
  // plans/ フォルダ内の画像が自動的に使用されます
  planImages: {
    // plans/ フォルダ内で trial を含むファイル名の画像
    trial: getImageByKeyword(plansImageModules, 'trial', 'plan-trial'),
    // plans/ フォルダ内で horse-care または horsecare を含むファイル名の画像
    horseCare: getImageByKeyword(plansImageModules, 'horse-care', 'plan-horse-care') || 
               getImageByKeyword(plansImageModules, 'horsecare', 'plan-horse-care'),
    // plans/ フォルダ内で lesson を含むファイル名の画像
    lesson: getImageByKeyword(plansImageModules, 'lesson', 'plan-lesson')
  },

  // 地図エリアの代替画像
  // maps/ フォルダに入れた画像が自動的に使用されます
  map: resolveImageFromFolder(mapsImageModules, 'map')
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