import type { Language } from './LanguageContext'

const EN_TO_UK: Record<string, string> = {
  // Shared shell
  'Language selector': 'Перемикач мови',
  'Portfolio project controls': 'Керування проєктами портфоліо',
  'Previous project': 'Попередній проєкт',
  'Next project': 'Наступний проєкт',
  'All projects': 'Усі проєкти',
  'Back to top': 'На початок',
  'Back to top ↑': 'На початок ↑',
  'Open menu': 'Відкрити меню',
  'Close menu': 'Закрити меню',
  'Open navigation': 'Відкрити навігацію',
  'Close navigation': 'Закрити навігацію',
  'Mobile navigation': 'Мобільна навігація',
  'Primary navigation': 'Основна навігація',
  'Work': 'Роботи',
  'Projects': 'Проєкти',
  'Practice': 'Практика',
  'Locations': 'Локації',
  'Services': 'Послуги',
  'Process': 'Процес',
  'Studio': 'Студія',
  'Follow': 'Стежити',
  'Email': 'Ел. пошта',
  'Date': 'Дата',
  'Top ↑': 'Нагору ↑',
  'Location': 'Локація',
  'Status': 'Статус',
  'Other': 'Інше',
  'Select one': 'Оберіть варіант',
  'Your name': 'Ваше ім’я',
  'Full name': 'Повне ім’я',
  'Name': 'Ім’я',
  'Email address': 'Електронна пошта',
  'Close': 'Закрити',
  'Back': 'Назад',
  'Tokyo': 'Токіо',
  'London': 'Лондон',
  'Tokyo · London': 'Токіо · Лондон',
  'Mayfair · London': 'Мейфер · Лондон',
  'Mayfair, London': 'Мейфер, Лондон',
  'Comporta, Portugal': 'Компорта, Португалія',
  'London, UK': 'Лондон, Велика Британія',
  'Mallorca, Spain': 'Майорка, Іспанія',
  'Hampstead, London': 'Гемпстед, Лондон',
  'Copenhagen, DK': 'Копенгаген, Данія',
  'Menorca, ES': 'Менорка, Іспанія',
  'Berlin, DE': 'Берлін, Німеччина',
  'Lisbon, PT': 'Лісабон, Португалія',
  'Kyoto, JP': 'Кіото, Японія',
  'Copenhagen / London': 'Копенгаген / Лондон',

  // Main portfolio fallback (the shell also uses explicit translations)
  'Available for selected projects': 'Відкриті до вибраних проєктів',
  'Warsaw · Worldwide': 'Варшава · Увесь світ',
  'We build digital worlds': 'Створюємо цифрові світи',
  'your business can own.': 'які належатимуть вашому бізнесу.',
  'Strategy, design and development for ambitious businesses that refuse to look interchangeable.':
    'Стратегія, дизайн і розробка для амбітних компаній, які відмовляються бути схожими на інших.',
  'Explore projects': 'Переглянути проєкти',
  'Selected experiences': 'Вибрані роботи',
  'Five businesses. Five independent visual systems. Enter any project to explore the working experience.':
    'П’ять бізнесів. П’ять самобутніх візуальних систем. Відкрийте будь-який проєкт і дослідіть його наживо.',
  'Interior architecture': 'Архітектура інтер’єру',
  'Quiet spaces, precisely composed.': 'Тихі простори, вивірені до деталей.',
  'Independent fragrance': 'Незалежна парфумерія',
  'Scent after the lights go down.': 'Аромат, що оживає після заходу сонця.',
  'Playful celebrations': 'Яскраві святкування',
  'Big little days, brilliantly made.': 'Великі маленькі дні, створені блискуче.',
  'Japanese dining': 'Японська кухня',
  'Tokyo technique, seasonal instinct.': 'Токійська техніка, сезонна інтуїція.',
  'Property development': 'Девелопмент нерухомості',
  'Homes of lasting consequence.': 'Оселі з цінністю на покоління.',
  'Open live experience ↗': 'Відкрити інтерактивний проєкт ↗',
  'What we do': 'Що ми робимо',
  'One partner, from first thought to final pixel.': 'Один партнер — від першої думки до фінального пікселя.',
  'Creative direction': 'Креативний напрям',
  'Positioning, visual language, content systems': 'Позиціювання, візуальна мова, контент-системи',
  'Web design': 'Вебдизайн',
  'Editorial layouts, UI systems, responsive art direction': 'Редакційні макети, UI-системи, адаптивний артдирекшн',
  'Development': 'Розробка',
  'React builds, motion, commerce, clean handoff': 'React-розробка, анімація, комерція, чиста передача',
  'Digital launches': 'Цифрові запуски',
  'QA, refinement, analytics, ongoing evolution': 'QA, вдосконалення, аналітика, постійний розвиток',
  'How it happens': 'Як ми працюємо',
  'Clear thinking.': 'Ясне мислення.',
  'Beautiful execution.': 'Бездоганне втілення.',
  'A compact senior team moves from strategy to shipped product without the layers, lag or lost-in-translation moments.':
    'Невелика команда досвідчених фахівців веде проєкт від стратегії до запуску без зайвих рівнів, затримок і втрат сенсу.',
  'Discover': 'Дослідження',
  'We align on audience, ambition, constraints and the commercial job to be done.':
    'Узгоджуємо аудиторію, амбіцію, обмеження та бізнес-завдання.',
  'Direct': 'Напрям',
  'A sharp creative territory gives every later decision a reason.':
    'Чітка креативна територія надає сенс кожному наступному рішенню.',
  'Design + build': 'Дизайн + розробка',
  'The interface and code evolve together, with interaction considered from day one.':
    'Інтерфейс і код розвиваються разом, а взаємодію продумуємо від першого дня.',
  'Launch': 'Запуск',
  'We pressure-test the details, ship cleanly and stay close after release.':
    'Перевіряємо кожну деталь, чисто запускаємо й залишаємося поруч після релізу.',
  'Have a project in mind?': 'Маєте проєкт?',
  'Let’s build something': 'Створімо щось,',
  'people remember.': 'що люди запам’ятають.',
  'Start a conversation': 'Почати розмову',
  'Start a project': 'Почати проєкт',
  'Independent digital studio': 'Незалежна цифрова студія',
  'Message received': 'Повідомлення отримано',
  'Good things': 'Хороші речі',
  'start here.': 'починаються тут.',
  'Thanks — we’ll come back with a thoughtful response within two working days.':
    'Дякуємо — повернемося з продуманою відповіддю протягом двох робочих днів.',
  'Back to the work': 'Повернутися до робіт',
  'New business · 2026': 'Нові проєкти · 2026',
  'Tell us what': 'Розкажіть, що',
  'you’re building.': 'ви створюєте.',
  'Name or company': 'Ім’я або компанія',
  'Project type': 'Тип проєкту',
  'Brand + website': 'Бренд + сайт',
  'E-commerce': 'E-commerce',
  'Website redesign': 'Редизайн сайту',
  'Something else': 'Щось інше',
  'A little context': 'Трохи контексту',
  'Goals, timing, ambition…': 'Цілі, терміни, амбіція…',
  'Send project brief': 'Надіслати бриф',

  // Maison Vale — service
  'Maison Vale, home': 'Maison Vale, головна',
  'Maison Vale navigation': 'Навігація Maison Vale',
  'Begin a project': 'Почати проєкт',
  'Interior architecture · London & beyond': 'Архітектура інтер’єру · Лондон і світ',
  'Rooms with': 'Простори з',
  'a quiet pulse.': 'тихим пульсом.',
  'a quiet': 'тихим',
  'pulse.': 'пульсом.',
  'We create soulful interiors for people who value restraint, character and the beautifully unexpected.':
    'Ми створюємо душевні інтер’єри для тих, хто цінує стриманість, характер і прекрасну несподіваність.',
  'Explore our work': 'Переглянути роботи',
  'Warm modern living room with sculptural furniture': 'Тепла сучасна вітальня зі скульптурними меблями',
  'Hampstead House · 2025': 'Hampstead House · 2025',
  'The studio': 'Студія',
  'A home should feel collected, not decorated.': 'Дім має відчуватися зібраним, а не декорованим.',
  'Maison Vale is a London-based interior architecture studio founded by Elise Vale. We shape enduring spaces through an instinctive dialogue between architecture, art and the rituals of daily life.':
    'Maison Vale — лондонська студія архітектури інтер’єру, заснована Еліз Вейл. Ми створюємо довговічні простори через інтуїтивний діалог архітектури, мистецтва й ритуалів щоденного життя.',
  'Our work is calm but never anonymous—layered with natural materials, honest craft and moments that reveal themselves slowly.':
    'Наші роботи спокійні, але ніколи не безликі — у них поєднуються природні матеріали, чесне ремесло й деталі, що розкриваються поступово.',
  'One vision,': 'Єдине бачення,',
  'fully considered.': 'продумане до кінця.',
  'From the architecture of a room to the object on a table, we hold the entire story.':
    'Від архітектури кімнати до предмета на столі — ми тримаємо в руках усю історію.',
  'Spatial planning, material direction and architectural detailing—resolved as one quiet, coherent whole.':
    'Просторове планування, добір матеріалів і архітектурні деталі, зведені в одне спокійне й цілісне рішення.',
  'Furniture & objects': 'Меблі та об’єкти',
  'Bespoke joinery, collectible pieces and everyday objects selected for tactility, longevity and soul.':
    'Індивідуальні столярні вироби, колекційні речі та щоденні предмети, обрані за тактильність, довговічність і душу.',
  'Creative stewardship': 'Креативний супровід',
  'A considered hand from first sketch to final installation, coordinating makers, trades and every last detail.':
    'Уважний супровід від першого ескізу до фінального монтажу з координацією майстрів, підрядників і кожної деталі.',
  'Selected work': 'Вибрані роботи',
  'Spaces that feel': 'Простори, що здаються',
  'inevitable.': 'неминучими.',
  'View project': 'Переглянути проєкт',
  'Residential': 'Житлові',
  'Hospitality': 'Гостинність',
  'Workplace': 'Робочі простори',
  'A coastal retreat shaped by filtered light, sand-washed oak and the slow rhythm of the Atlantic.':
    'Прибережний дім, сформований розсіяним світлом, вибіленим дубом і повільним ритмом Атлантики.',
  'A Georgian townhouse rebalanced with sculptural plaster, aged brass and a collection built over generations.':
    'Георгіанський таунхаус, переосмислений скульптурною штукатуркою, зістареною латунню та колекцією кількох поколінь.',
  'An intimate guesthouse where monolithic stone meets woven fibres, limewash and Mediterranean shade.':
    'Камерний гостьовий будинок, де монолітний камінь зустрічається з плетеними волокнами, вапном і середземноморською тінню.',
  'Handcrafted interior materials and furniture': 'Інтер’єрні матеріали й меблі ручної роботи',
  'Material study · Chalk, oak, linen': 'Дослідження матеріалів · Крейда, дуб, льон',
  'Our process': 'Наш процес',
  'Rigour,': 'Точність,',
  'with feeling.': 'у якій є почуття.',
  'Listen': 'Слухаємо',
  'We begin with how you live—not a prescribed look.': 'Починаємо з того, як ви живете, а не з готового стилю.',
  'Distil': 'Відсіюємо зайве',
  'We edit the brief into a clear spatial and material idea.': 'Перетворюємо бриф на ясну просторову й матеріальну ідею.',
  'Compose': 'Комбінуємо',
  'Architecture, objects and light are developed in concert.': 'Архітектуру, об’єкти та світло розробляємо як єдине ціле.',
  'Realise': 'Втілюємо',
  'We steward every decision through making and installation.': 'Супроводжуємо кожне рішення від виготовлення до монтажу.',
  '“Elise understood the way we wanted to live before we had the words for it. The result feels entirely ours—only more beautiful.”':
    '“Еліз зрозуміла, як ми хочемо жити, ще до того, як ми змогли це сформулювати. Результат повністю наш — лише красивіший.”',
  'Private client': 'Приватний клієнт',
  'Have a place in mind?': 'Маєте простір на думці?',
  'Let’s create a home': 'Створімо дім,',
  'that feels like you.': 'схожий саме на вас.',
  'that feels': 'що буде',
  'like you.': 'саме вашим.',
  'Begin an inquiry': 'Почати розмову',
  'Thank you.': 'Дякуємо.',
  'Your note is with the studio. We’ll be in touch within two working days.':
    'Ваше повідомлення вже у студії. Ми зв’яжемося протягом двох робочих днів.',
  'you@domain.com': 'ви@домен.com',
  'Project location': 'Локація проєкту',
  'City, country': 'Місто, країна',
  'Full residence': 'Уся резиденція',
  'Selected rooms': 'Окремі кімнати',
  'Tell us a little about the project': 'Розкажіть трохи про проєкт',
  'Scope, timing and what brought you to us…': 'Масштаб, терміни й що привело вас до нас…',
  'Send inquiry': 'Надіслати запит',
  'London · Lisbon · Elsewhere': 'Лондон · Лісабон · Інші місця',
  'Close project': 'Закрити проєкт',
  'Discuss a similar project': 'Обговорити схожий проєкт',

  // Lumi Club — events
  'Lumi Club home': 'Lumi Club, головна',
  'Lumi Club navigation': 'Навігація Lumi Club',
  'Parties': 'Свята',
  'Packages': 'Пакети',
  'Moments': 'Моменти',
  'Plan a party': 'Спланувати свято',
  'Extraordinary parties for little people': 'Надзвичайні свята для маленьких людей',
  'Their big day,': 'Їхній великий день,',
  'brilliantly': 'блискуче',
  'made.': 'створений.',
  'Design-led children’s celebrations, full of proper play, bright ideas and the kind of details grown-ups notice too.':
    'Дитячі свята з продуманим дизайном, справжньою грою, яскравими ідеями й деталями, які помічають і дорослі.',
  'Build your party': 'Створити своє свято',
  'See the magic': 'Побачити магію',
  'from 240 happy families': 'від 240 щасливих родин',
  'A joyful, colourful birthday celebration': 'Радісне яскраве святкування дня народження',
  'joy, handled': 'радість під контролем',
  'What Lumi Club brings': 'Що дарує Lumi Club',
  'Big imagination': 'Велика уява',
  'Zero party stress': 'Жодного святкового стресу',
  'Beautifully hosted': 'Бездоганна організація',
  'Pick your kind of brilliant': 'Оберіть свій формат захоплення',
  'One good reason': 'Один чудовий привід',
  'to get very excited.': 'дуже зрадіти.',
  'Every Lumi experience is created for real children—not photo shoots. Beautiful, yes. But always wildly good fun.':
    'Кожне свято Lumi створене для справжніх дітей, а не фотосесій. Красиве — так. Але насамперед неймовірно веселе.',
  'Birthday': 'День народження',
  'The signature party': 'Фірмове свято',
  'A joyful, fully hosted celebration built around one brilliant little person.':
    'Радісне свято з повним супроводом, створене навколо однієї чудової маленької людини.',
  'Little disco': 'Міні-диско',
  'Lights up, music on': 'Світло ввімкнено, музика грає',
  'A high-energy dance floor, mini DJ games and a finale made for happy feet.':
    'Енергійний танцмайданчик, мініігри з DJ та фінал для ніг, що не можуть всидіти.',
  'Creative lab': 'Творча лабораторія',
  'Make something marvellous': 'Створімо щось дивовижне',
  'Beautifully styled workshops where curious minds paint, build, mix and invent.':
    'Красиво оформлені майстерні, де допитливі діти малюють, будують, змішують і винаходять.',
  'Choose their world': 'Оберіть їхній світ',
  'Never off-the-shelf.': 'Ніколи не шаблонне.',
  'Always theirs.': 'Завжди їхнє.',
  'Select a starting theme. We’ll layer in their favourite colours, stories and wonderfully specific obsessions.':
    'Оберіть початкову тему. Ми додамо улюблені кольори, історії та напрочуд особливі захоплення дитини.',
  'Party theme': 'Тема свята',
  'Cosmic': 'Космос',
  'Wild': 'Дика природа',
  'Candy': 'Солодощі',
  'Magic': 'Магія',
  'Current mood': 'Поточний настрій',
  'Cosmic wonderland': 'Космічна країна див',
  'Wild wonderland': 'Дика країна див',
  'Candy wonderland': 'Солодка країна див',
  'Magic wonderland': 'Магічна країна див',
  'We’ll make it unmistakably theirs.': 'Ми зробимо його безпомилково їхнім.',
  'Good times, neatly packaged': 'Гарний час у продуманих пакетах',
  'Choose your': 'Оберіть свій',
  'level of wow.': 'рівень захоплення.',
  'All packages include thoughtful planning, professional party hosts and our unflappable day-of support.':
    'Усі пакети включають продумане планування, професійних ведучих і наш спокійний супровід у день свята.',
  'Sweet & simple': 'Мило й просто',
  'Most loved': 'Найулюбленіший',
  'Everything, beautifully': 'Усе, бездоганно',
  '90 min': '90 хв',
  '2.5 hours': '2,5 години',
  '4 hours': '4 години',
  '1 Lumi host': '1 ведучий Lumi',
  '2 Lumi hosts': '2 ведучі Lumi',
  'Games & music': 'Ігри та музика',
  'Digital invitations': 'Цифрові запрошення',
  'Up to 10 children': 'До 10 дітей',
  'Styled theme set': 'Стилізоване тематичне оформлення',
  'Cake moment': 'Святкова подача торта',
  'Party keepsakes': 'Пам’ятні подарунки',
  'Up to 16 children': 'До 16 дітей',
  'Full creative direction': 'Повний креативний супровід',
  'Immersive decor': 'Імерсивний декор',
  'Live show': 'Живе шоу',
  'Photo story': 'Фоторепортаж',
  'Up to 24 children': 'До 24 дітей',
  'from': 'від',
  'Selected': 'Обрано',
  'Choose package': 'Обрати пакет',
  'Made of moments': 'Створено з моментів',
  'The lovely, loud,': 'Чудові, гучні,',
  'can-we-do-it-again kind.': '«можна ще раз?» моменти.',
  'Colourful birthday cake with candles': 'Яскравий святковий торт зі свічками',
  'Happy child at a party': 'Щаслива дитина на святі',
  'Friends celebrating together': 'Друзі святкують разом',
  'Party decorations': 'Святкові декорації',
  'Lumi moments': 'Моменти Lumi',
  '/ Lumi moments': '/ моменти Lumi',
  'Five stars': 'П’ять зірок',
  '“The children called it the best day ever. I called it the first party I’ve actually enjoyed hosting.”':
    '“Діти назвали це найкращим днем у житті. А я — першим святом, організацією якого справді насолодилася.”',
  'Portrait of Amelia': 'Портрет Амелії',
  'Mum to Florence, age 7': 'Мама Флоренс, 7 років',
  'Your party starts here': 'Ваше свято починається тут',
  'Let’s make a': 'Створімо трохи',
  'little magic.': 'маленької магії.',
  'Build a quick party outline and get an instant estimate. We’ll follow up with the clever ideas.':
    'Складіть короткий план свята й одразу отримайте розрахунок. А ми повернемося з розумними ідеями.',
  'No hidden surprises.': 'Без прихованих сюрпризів.',
  'Your estimate updates as you build.': 'Розрахунок оновлюється в процесі.',
  'What are we celebrating?': 'Що святкуємо?',
  'Age of the party star': 'Вік головної зірки свята',
  'Number of children': 'Кількість дітей',
  'Remove one child': 'Зменшити кількість дітей на одну',
  'Add one child': 'Додати одну дитину',
  'Ideal date': 'Бажана дата',
  'Package': 'Пакет',
  'Your estimated party': 'Орієнтовна вартість свята',
  'ages': 'вік',
  'Request my party plan': 'Отримати план свята',
  'Your party idea is on its way!': 'Ідея вашого свята вже в дорозі!',
  'We’ve saved the outline. A Lumi planner would be in touch within one working day.':
    'Ми зберегли план. Організатор Lumi зв’яжеться з вами протягом одного робочого дня.',
  'Really good parties for': 'Справді чудові свята для',
  'really brilliant children.': 'справді чудових дітей.',
  '© 2026 Lumi Club. Joyfully made.': '© 2026 Lumi Club. Створено з радістю.',

  // Kinu — restaurant
  'Kinu, home': 'Kinu, головна',
  'Kinu navigation': 'Навігація Kinu',
  'Story': 'Історія',
  'Menu': 'Меню',
  'Chef': 'Шеф',
  'Visit': 'Візит',
  'Reservations': 'Бронювання',
  'Reserve a table': 'Забронювати столик',
  'Modern kaiseki': 'Сучасне кайсекі',
  'Tokyo technique.': 'Токійська техніка.',
  'British seasons.': 'Британські сезони.',
  'Enter': 'Увійти',
  'Tuesday—Saturday': 'Вівторок—субота',
  'Dinner from 5:30': 'Вечеря з 17:30',
  'Our story': 'Наша історія',
  'Not fusion.': 'Не ф’южн.',
  'A conversation.': 'Діалог.',
  'Between Tokyo': 'Між Токіо',
  'Between': 'Між',
  'and this moment.': 'і цією миттю.',
  'Intimate Japanese restaurant counter': 'Камерна стійка японського ресторану',
  'Our counter · twelve seats': 'Наша стійка · дванадцять місць',
  'Kinu means silk: fine, resilient, made from countless threads.':
    'Kinu означає шовк: тонкий, міцний, створений із безлічі ниток.',
  'Our cooking follows the same idea. Japanese discipline is woven with produce from British shores, farms and forests. The result belongs to neither place entirely—and could only exist here.':
    'Наша кухня наслідує цю ідею. Японська дисципліна переплітається з продуктами британських берегів, ферм і лісів. Результат не належить повністю жодному з цих місць — і міг виникнути лише тут.',
  'Each evening unfolds at the pace of the season, one plate at a time.':
    'Кожен вечір розгортається в ритмі сезону, страва за стравою.',
  'Discover the menu': 'Відкрити меню',
  "Chef's hands preparing sushi": 'Руки шефа під час приготування суші',
  'The menu': 'Меню',
  'Summer · 2026': 'Літо · 2026',
  'Designed to share. Our menu changes with the day’s arrivals.':
    'Створено, щоб ділитися. Меню змінюється разом із щоденними поставками.',
  'Menu categories': 'Категорії меню',
  'Sake pairing': 'Супровід саке',
  'Fourteen moments · chef’s seasonal expression': 'Чотирнадцять миттєвостей · сезонне висловлювання шефа',
  'Ten moments · fish, fire, rice and broth': 'Десять миттєвостей · риба, вогонь, рис і бульйон',
  'Nine moments · a plant-led tasting journey': 'Дев’ять миттєвостей · рослинна дегустаційна подорож',
  'Rare and small-production sake · six pours': 'Рідкісне саке малих виробництв · шість подач',
  'Corn · king crab · white shoyu': 'Кукурудза · королівський краб · біле шою',
  'Hokkaido scallop': 'Гребінець із Хоккайдо',
  'Sudachi · shiso oil · finger lime': 'Судачі · олія шисо · пальчиковий лайм',
  'Toro tartare': 'Тартар із торо',
  'Smoked daikon · oscietra · nori': 'Копчений дайкон · осетра · норі',
  'Silken tofu': 'Шовковий тофу',
  'Myoga · mountain tomato · sansho': 'Мьоґа · гірський томат · саншо',
  'Golden eye snapper · yuzu kosho': 'Берикс · юдзу-кошьо',
  'Medium fatty tuna · nikiri': 'Середньожирний тунець · нікірі',
  'Bigfin reef squid · sea salt · lime': 'Великоперий рифовий кальмар · морська сіль · лайм',
  'Hokkaido sea urchin · warm rice': 'Морський їжак із Хоккайдо · теплий рис',
  'Miso black cod': 'Чорна тріска в місо',
  'Saikyo miso · pickled ginger': 'Місо сайкьо · маринований імбир',
  'Kagoshima striploin · fresh wasabi · tare': 'Стриплойн із Каґошіми · свіжий васабі · таре',
  'Koji aubergine': 'Баклажан коджі',
  'Red miso · sesame · spring onion': 'Червоне місо · кунжут · зелена цибуля',
  'King oyster': 'Королівська глива',
  'Smoked soy · mitsuba · fermented chilli': 'Копчена соя · міцуба · ферментований чилі',
  'Miso caramel': 'Місо-карамель',
  'Hojicha ice cream · puffed rice': 'Морозиво ходжіча · повітряний рис',
  'Yuzu curd · sake kasu · shiso granita': 'Крем юдзу · саке касу · граніта шисо',
  'Strawberry · genmaicha · white chocolate': 'Полуниця · ґенмайча · білий шоколад',
  'Seasonal wagashi': 'Сезонні ваґаші',
  'Hand-shaped sweets · ceremonial matcha': 'Цукерки ручної роботи · церемоніальна матча',
  'Please tell us about allergies when booking. A discretionary 15% service charge is added to your bill.':
    'Будь ласка, повідомте про алергії під час бронювання. До рахунку додається необов’язковий сервісний збір 15%.',
  'Chef Ren Ito in the Kinu kitchen': 'Шеф Рен Іто на кухні Kinu',
  'Ren Ito · Chef founder': 'Рен Іто · шеф-засновник',
  'The chef': 'Шеф',
  '“Luxury is not excess. It is the right ingredient, at the right moment, with nowhere to hide.”':
    '“Розкіш — не надмірність. Це правильний інгредієнт у правильну мить, якому нема де сховатися.”',
  'Raised in Kamakura, Ren trained in Kyoto before spending a decade in the kitchens of Paris and Copenhagen. Kinu is his return to the clarity of Japanese cooking—with a new landscape at hand.':
    'Рен виріс у Камакурі, навчався в Кіото, а потім провів десятиліття на кухнях Парижа й Копенгагена. Kinu — його повернення до ясності японської кухні в новому ландшафті.',
  'Our philosophy': 'Наша філософія',
  'Three threads.': 'Три нитки.',
  'One experience.': 'Один досвід.',
  'One': 'Один',
  'experience.': 'досвід.',
  'Season': 'Сезон',
  'Space': 'Простір',
  'Hand': 'Рука',
  '旬 · Season': '旬 · Сезон',
  '間 · Space': '間 · Простір',
  '手 · Hand': '手 · Рука',
  'Ingredients at their precise point of beauty. Not before. Not after.':
    'Інгредієнти в точній миті своєї краси. Не раніше. Не пізніше.',
  'The pause between courses, the quiet around a plate, room to notice.':
    'Пауза між подачами, тиша навколо тарілки, простір, щоб помітити.',
  'The trace of the maker in every cut, vessel, fold and gesture.':
    'Слід майстра в кожному зрізі, посудині, згині й жесті.',
  'Kinu gallery': 'Галерея Kinu',
  'Scenes from Kinu': 'Сцени з Kinu',
  'Click an image to explore': 'Натисніть на зображення, щоб роздивитися',
  'A precise selection of nigiri sushi': 'Вишукана добірка ніґірі-суші',
  'Chef preparing fresh sushi at the counter': 'Шеф готує свіжі суші за стійкою',
  'Japanese dishes set for dinner': 'Японські страви, подані до вечері',
  'Seasonal Japanese small plate': 'Сезонна японська мала страва',
  'Sashimi with delicate garnishes': 'Сашимі з делікатними гарнірами',
  'Find us': 'Знайдіть нас',
  'after dusk.': 'після сутінків.',
  'after': 'після',
  'dusk.': 'сутінків.',
  'Dinner 17:30—23:30': 'Вечеря 17:30—23:30',
  'Last seating 21:30': 'Остання посадка о 21:30',
  'Open in maps': 'Відкрити на мапі',
  'Warm evening at a Japanese restaurant': 'Теплий вечір у японському ресторані',
  'Your seat': 'Ваше місце',
  'at the counter.': 'за стійкою.',
  'at the': 'за',
  'counter.': 'стійкою.',
  'For parties larger than six or private dining, please call us directly.':
    'Для компаній понад шість гостей або приватної вечері зателефонуйте нам напряму.',
  'Reservation received': 'Бронювання отримано',
  'We look forward': 'З нетерпінням чекаємо,',
  'to welcoming you,': 'щоб привітати вас,',
  'guests': 'гостей',
  'A confirmation has been sent to your email. Please allow two hours for the full Kinu experience.':
    'Підтвердження надіслано на вашу пошту. Закладіть дві години для повного досвіду Kinu.',
  'Make another reservation': 'Зробити ще одне бронювання',
  'Guests': 'Гості',
  '1 guest': '1 гість',
  '2 guests': '2 гості',
  '3 guests': '3 гості',
  '4 guests': '4 гості',
  '5 guests': '5 гостей',
  '6 guests': '6 гостей',
  'Preferred time': 'Бажаний час',
  'Notes': 'Примітки',
  'Optional': 'Необов’язково',
  'Allergies, celebration, or anything we should know': 'Алергії, подія або все, що нам варто знати',
  'Request reservation': 'Запросити бронювання',
  'Enquiries': 'Звернення',
  'Japanese dining · Mayfair': 'Японська кухня · Мейфер',
  'Gallery image viewer': 'Перегляд зображень галереї',
  'Close gallery': 'Закрити галерею',
  'Previous image': 'Попереднє зображення',
  'Next image': 'Наступне зображення',

  // Monument — estate
  'Monument home': 'Monument, головна',
  'Monument navigation': 'Навігація Monument',
  'Enquire': 'Зв’язатися',
  'Sculptural modern home in warm stone': 'Скульптурний сучасний дім із теплого каменю',
  'Spaces': 'Простори',
  'of lasting': 'тривалої',
  'consequence.': 'ваги.',
  'Monument develops architecture with permanence—considered homes, rare retreats and cultural workplaces across Europe.':
    'Monument створює архітектуру надовго — продумані домівки, рідкісні місця для відпочинку й культурні робочі простори по всій Європі.',
  'View selected work': 'Переглянути вибрані роботи',
  'We make places that improve with time, shaped by material intelligence and an exacting sense of proportion.':
    'Ми створюємо місця, що стають кращими з часом, спираючись на розуміння матеріалів і безкомпромісне відчуття пропорції.',
  'From first site reading to the final hand-finished surface, we unite development, architecture and interiors under one point of view.':
    'Від першого прочитання ділянки до останньої поверхні, завершеної вручну, ми об’єднуємо девелопмент, архітектуру й інтер’єри одним баченням.',
  'Commission Monument': 'Замовити Monument',
  'Selected projects': 'Вибрані проєкти',
  '02 / Selected projects': '02 / Вибрані проєкти',
  'Built with intent.': 'Створено з наміром.',
  'Private residences, hospitality and workplaces. Each singular; all grounded in place.':
    'Приватні резиденції, гостинність і робочі простори. Кожен унікальний, усі вкорінені в місце.',
  'Filter projects': 'Фільтр проєктів',
  'All': 'Усі',
  'In numbers': 'У цифрах',
  '03 / In numbers': '03 / У цифрах',
  'Completed places': 'Завершених просторів',
  'Cities in practice': 'Міст у практиці',
  'International awards': 'Міжнародних нагород',
  'People, one studio': 'Людей, одна студія',
  'Aerial landscape suggesting Monument project locations': 'Пейзаж із висоти, що позначає локації проєктів Monument',
  'Open Copenhagen project': 'Відкрити проєкт у Копенгагені',
  'Open London project': 'Відкрити проєкт у Лондоні',
  'Open Lisbon project': 'Відкрити проєкт у Лісабоні',
  'Selected European work': 'Вибрані європейські роботи',
  'In context': 'У контексті',
  '04 / In context': '04 / У контексті',
  'Locally found.': 'Знайдено локально.',
  'Globally exacting.': 'Вивірено глобально.',
  'Our Copenhagen studio works across Europe and selected international sites. We begin with climate, craft and the histories already held by a place.':
    'Наша копенгагенська студія працює по всій Європі та на вибраних міжнародних майданчиках. Ми починаємо з клімату, ремесла й історій, які вже зберігає місце.',
  'Hours': 'Години роботи',
  'Mon—Fri': 'Пн—Пт',
  'Arrange a studio visit': 'Домовитися про візит до студії',
  'Private enquiries': 'Приватні звернення',
  '05 / Private enquiries': '05 / Приватні звернення',
  'What will': 'Що ви',
  'you leave behind?': 'залишите по собі?',
  'Tell us about the site, the ambition, and where you are in the process. Every conversation begins in confidence.':
    'Розкажіть про ділянку, амбіцію та етап процесу. Кожна розмова починається конфіденційно.',
  '01 / Your name': '01 / Ваше ім’я',
  '02 / Email address': '02 / Електронна пошта',
  '03 / Enquiry': '03 / Запит',
  'General enquiry': 'Загальний запит',
  '04 / A few details': '04 / Кілька деталей',
  'Site, location, timeframe and ambition': 'Ділянка, локація, терміни й амбіція',
  'Send private enquiry': 'Надіслати приватний запит',
  'Enquiry received.': 'Запит отримано.',
  'Our development director will respond within two working days.':
    'Наш директор із девелопменту відповість протягом двох робочих днів.',
  'Architecture & development': 'Архітектура та девелопмент',
  'Close project detail': 'Закрити деталі проєкту',
  'Enquire about': 'Запит щодо',
  'Internal area': 'Внутрішня площа',
  'Composition': 'Склад',
  '4 bedrooms': '4 спальні',
  '5 bedrooms': '5 спалень',
  '3 bedrooms': '3 спальні',
  '18 suites': '18 люксів',
  '12 suites': '12 люксів',
  '7 studios': '7 студій',
  'Available': 'Доступно',
  'Opening Q4': 'Відкриття у IV кварталі',
  'Private sale': 'Приватний продаж',
  'Completed': 'Завершено',
  'Two remaining': 'Залишилося два',
  'In development': 'У розробці',
  'A study in northern light, honed limestone and quiet domestic ritual. Private gardens frame every principal room.':
    'Дослідження північного світла, шліфованого вапняку й тихого домашнього ритуалу. Приватні сади обрамляють кожну головну кімнату.',
  'An intimate retreat carved into the island landscape, where shaded courts connect stone, sea air and slow living.':
    'Камерний прихисток, вирізьблений в острівному ландшафті, де затінені дворики поєднують камінь, морське повітря й неквапне життя.',
  'A rigorously restored townhouse with a newly composed garden wing, crafted for enduring city life.':
    'Ретельно відновлений таунхаус із новим садовим крилом, створений для тривалого міського життя.',
  'A former industrial shell reshaped as adaptable studios, anchored by a generous collective hall and winter garden.':
    'Колишній промисловий корпус, перетворений на гнучкі студії довкола просторої спільної зали та зимового саду.',
  'Four restrained courtyard homes designed around textured shade, long views and the scent of citrus trees.':
    'Чотири стримані будинки з дворами, спроєктовані навколо фактурної тіні, далеких краєвидів і аромату цитрусових дерев.',
  'A contemporary inn shaped by precise timber joinery, inward gardens and a choreography of shadow.':
    'Сучасний заїжджий двір, сформований точною дерев’яною роботою, внутрішніми садами й хореографією тіні.',
  'We make places that improve with time, shaped by':
    'Ми створюємо місця, що стають кращими з часом, спираючись на',
  'material intelligence': 'розуміння матеріалів',
  'and an exacting sense of proportion.': 'і безкомпромісне відчуття пропорції.',
}

const originalText = new WeakMap<Text, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()
const translatableAttributes = ['aria-label', 'placeholder', 'title', 'alt'] as const

function preserveWhitespace(source: string, translated: string) {
  const leading = source.match(/^\s*/)?.[0] ?? ''
  const trailing = source.match(/\s*$/)?.[0] ?? ''
  return `${leading}${translated}${trailing}`
}

function translatePattern(value: string): string | null {
  let match = value.match(/^Project (\d+) of (\d+)$/)
  if (match) return `Проєкт ${match[1]} із ${match[2]}`

  match = value.match(/^Plan a (.+) event$/)
  if (match) return `Спланувати подію: ${EN_TO_UK[match[1]] ?? match[1]}`

  match = value.match(/^View (.+)$/)
  if (match) return `Переглянути ${match[1]}`

  match = value.match(/^Open image: (.+)$/)
  if (match) return `Відкрити зображення: ${EN_TO_UK[match[1]] ?? match[1]}`

  match = value.match(/^(.+) project details$/)
  if (match) return `Деталі проєкту ${match[1]}`

  match = value.match(/^(.+) architecture$/)
  if (match) return `Архітектура ${match[1]}`

  match = value.match(/^Enquire about (.+)$/)
  if (match) return `Запит щодо ${match[1]}`

  match = value.match(/^(.+) · ages (.+) · (.+)$/)
  if (match) {
    return `${EN_TO_UK[match[1]] ?? match[1]} · вік ${match[2]} · ${EN_TO_UK[match[3]] ?? match[3]}`
  }

  match = value.match(/^We look forward to welcoming you, (.+)\.$/)
  if (match) return `З нетерпінням чекаємо на вас, ${match[1]}.`

  match = value.match(/^(\d+) guests$/)
  if (match) {
    const count = Number(match[1])
    const noun = count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'
    return `${count} ${noun}`
  }

  match = value.match(/^(\d+) \/ Lumi moments$/)
  if (match) return `${match[1]} / моменти Lumi`

  return null
}

function ukrainianFor(value: string) {
  return EN_TO_UK[value] ?? translatePattern(value)
}

function translateTextNode(node: Text, language: Language) {
  const current = node.nodeValue ?? ''
  const trimmed = current.trim()
  if (!trimmed) return

  if (language === 'en') {
    const source = originalText.get(node)
    if (source !== undefined && current !== source) node.nodeValue = source
    return
  }

  const currentTranslation = ukrainianFor(trimmed)
  if (currentTranslation) {
    // React may reuse a text node for a new dynamic English value. Keep the newest
    // source so switching back to English restores the correct UI state.
    originalText.set(node, current)
    const next = preserveWhitespace(current, currentTranslation)
    if (next !== current) node.nodeValue = next
    return
  }

  const source = originalText.get(node)
  if (!source) return
  const translated = ukrainianFor(source.trim())
  if (!translated) return
  const next = preserveWhitespace(source, translated)
  if (next !== current) node.nodeValue = next
}

function translateAttribute(element: Element, attribute: string, language: Language) {
  const current = element.getAttribute(attribute)
  if (!current) return

  let originals = originalAttributes.get(element)
  if (!originals) {
    originals = new Map()
    originalAttributes.set(element, originals)
  }

  if (language === 'en') {
    const source = originals.get(attribute)
    if (source !== undefined && source !== current) element.setAttribute(attribute, source)
    return
  }

  const currentTranslation = ukrainianFor(current.trim())
  if (currentTranslation) {
    originals.set(attribute, current)
    if (currentTranslation !== current) element.setAttribute(attribute, currentTranslation)
    return
  }

  const source = originals.get(attribute)
  if (!source) return
  const translated = ukrainianFor(source.trim())
  if (translated && translated !== current) element.setAttribute(attribute, translated)
}

function translateElement(element: Element, language: Language) {
  for (const attribute of translatableAttributes) translateAttribute(element, attribute, language)

  // Options without an explicit value derive their value from textContent. Pin the
  // English application value before translating the visible label.
  if (language === 'uk' && element instanceof HTMLOptionElement && !element.hasAttribute('value')) {
    element.setAttribute('value', element.textContent?.trim() ?? '')
  }

  for (const child of Array.from(element.childNodes)) translateNode(child, language)
}

function translateNode(node: Node, language: Language) {
  if (node.nodeType === Node.TEXT_NODE) {
    translateTextNode(node as Text, language)
    return
  }
  if (!(node instanceof Element) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) return
  translateElement(node, language)
}

export function localizeDom(root: HTMLElement, language: Language) {
  translateElement(root, language)
}

export function observeLocalizedDom(root: HTMLElement, language: Language) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        translateNode(mutation.target, language)
      } else if (mutation.type === 'attributes') {
        translateAttribute(mutation.target as Element, mutation.attributeName ?? '', language)
      } else {
        for (const node of Array.from(mutation.addedNodes)) translateNode(node, language)
      }
    }
  })

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...translatableAttributes],
  })

  return () => observer.disconnect()
}
