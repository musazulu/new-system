import { Member } from '../types/member';

export const AVATAR_GRADIENTS = [
  'from-blue-600 to-indigo-700',
  'from-emerald-600 to-teal-700',
  'from-purple-600 to-pink-700',
  'from-amber-600 to-orange-700',
  'from-rose-600 to-red-700',
  'from-cyan-600 to-blue-700',
  'from-violet-600 to-indigo-800',
  'from-teal-600 to-cyan-700',
];

export const AVAILABLE_ROLES = [
  'Member',
  'Executive',
  'Committee',
  'Core Member',
  'Staff',
  'Volunteer'
];

/**
 * Exact roster transcribed directly from the 3 uploaded documents:
 * Total: 99 members with exact names, surnames, mobile numbers, and checkmark statuses.
 */
export const EXACT_IMAGE_MEMBERS: Member[] = [
  // --- Page 1 (20261016_105411.jpg) ---
  {
    id: 'mem-001',
    firstName: 'Abel Panashe',
    surname: 'Mundiya',
    phone: '078 331 3429',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:00:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-002',
    firstName: 'Abraham',
    surname: 'Makamera',
    phone: '077 624 8943',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:01:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-003',
    firstName: 'Adeline',
    surname: 'Mhlanga',
    phone: '077 689 0237',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:02:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-004',
    firstName: 'Adella',
    surname: 'Javangwe',
    phone: '077 492 4619',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:03:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-005',
    firstName: 'Admore',
    surname: 'Mugandiwa',
    phone: '077 628 8754',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:04:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-006',
    firstName: 'Alexis Hazel',
    surname: 'Tshuma',
    phone: '077 595 3207',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:05:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-007',
    firstName: 'Alick',
    surname: 'Musengi',
    phone: '077 163 7300',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:06:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-008',
    firstName: 'Andile',
    surname: 'Matenga',
    phone: '078 511 9160',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:07:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-009',
    firstName: 'Anesu Matthew',
    surname: 'Ruwocha',
    phone: '078 598 6219',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:08:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-010',
    firstName: 'Anesu',
    surname: 'Mupimhidzi',
    phone: '077 425 5550',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:09:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-011',
    firstName: 'Annah',
    surname: 'Garudzo',
    phone: '078 721 5970',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:10:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-012',
    firstName: 'Augastine',
    surname: 'Moyo',
    phone: '077 799 3316',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:11:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-013',
    firstName: 'Belinda',
    surname: 'Mutongwizo',
    phone: '077 158 8895',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:12:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-014',
    firstName: 'Benjamin',
    surname: 'Muyewa',
    phone: '077 185 6723',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:13:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-015',
    firstName: 'Blessing',
    surname: 'Sithole',
    phone: '077 758 2876',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:14:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-016',
    firstName: 'Brian',
    surname: 'Fushayi',
    phone: '077 983 1492',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:15:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-017',
    firstName: 'Brian',
    surname: 'Shungwa',
    phone: '077 227 0660',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:16:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-018',
    firstName: 'Carlington',
    surname: 'Mapiki',
    phone: '078 850 7576',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:17:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-019',
    firstName: 'Caroline Resca',
    surname: 'Manyara',
    phone: '077 675 0718',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:18:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-020',
    firstName: 'Chrispen',
    surname: 'Chipfupi',
    phone: '077 452 5430',
    role: 'Member',
    status: 'active',
    createdAt: '2026-10-16T08:19:00Z',
    avatarColor: 'from-amber-600 to-orange-700',
    taxClearance: {
      status: 'valid',
      certificateNumber: 'ITF263',
      tin: '1000732986',
      authenticationCode: '49557662',
      taxpayerName: 'Chrispen Chipfupi',
      tradeName: 'Chrispen/Chipfupi/Tanisha investments/Tadisa Tradings',
      issuedOn: '2026-10-09',
      validFrom: '2026-10-09',
      validTo: '2026-12-31',
      imageUrl: '/assets/aistudio/image_749d51b6.png',
      uploadedAt: '2026-10-16T09:00:00Z',
      notes: 'ZIMRA Tax Clearance Certificate (ITF263) verified.'
    }
  },
  {
    id: 'mem-021',
    firstName: 'Chrispen',
    surname: 'Fernando',
    phone: '077 661 9683',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:20:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-022',
    firstName: 'Christina',
    surname: 'Kawanzaruwa',
    phone: '077 381 2216',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:21:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-023',
    firstName: 'Clyde',
    surname: 'Mundodzi',
    phone: '077 195 5484',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:22:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-024',
    firstName: 'Colin',
    surname: 'Kazingizi',
    phone: '077 802 9253',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:23:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-025',
    firstName: 'Crynos',
    surname: 'Matashu',
    phone: '077 666 4426',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:24:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-026',
    firstName: 'David',
    surname: 'Maramba',
    phone: '078 494 8871',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:25:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-027',
    firstName: 'Dazel',
    surname: 'Shara',
    phone: '077 101 6396',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:26:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-028',
    firstName: 'Denzel',
    surname: 'Shumba',
    phone: '078 012 2991',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:27:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-029',
    firstName: 'Dexter',
    surname: 'Muronzi',
    phone: '078 345 3143',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:28:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-030',
    firstName: 'Elizabeth',
    surname: 'Mazorodze',
    phone: '078 582 0828',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:29:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-031',
    firstName: 'Emmanuel',
    surname: 'Chawatama',
    phone: '078 772 2601',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:30:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-032',
    firstName: 'Enos',
    surname: 'Mayawo',
    phone: '078 439 3794',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:31:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-033',
    firstName: 'Esnath',
    surname: 'Chipise',
    phone: '078 380 4488',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:32:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-034',
    firstName: 'Estere',
    surname: 'Pailot',
    phone: '078 909 5262',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:33:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-035',
    firstName: 'Evelyn',
    surname: 'Chatora',
    phone: '077 317 3953',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:34:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-036',
    firstName: 'Fabulous',
    surname: 'Thodhlana',
    phone: '077 638 5020',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:35:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-037',
    firstName: 'Faith',
    surname: 'Dube',
    phone: '077 550 9575',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:36:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-038',
    firstName: 'Farai',
    surname: 'Kakwenya',
    phone: '078 365 4148',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:37:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-039',
    firstName: 'Gift',
    surname: 'Mugadagadha',
    phone: '078 530 4932',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:38:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-040',
    firstName: 'Gloria',
    surname: 'Kadzviti',
    phone: '077 564 9566',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:39:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-041',
    firstName: 'Hellen',
    surname: 'Tabanie',
    phone: '077 238 5173',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:40:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-042',
    firstName: 'Ian',
    surname: 'Mayawo',
    phone: '078 078 7024',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:41:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-043',
    firstName: 'Israel',
    surname: 'Mukucha',
    phone: '077 471 8832',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:42:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-044',
    firstName: 'Jeffrey Jeriphanos',
    surname: 'Kandoro',
    phone: '077 949 8230',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:43:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-045',
    firstName: 'Jeke',
    surname: 'Zulu',
    phone: '077 785 1809',
    role: 'Executive',
    status: 'active',
    createdAt: '2026-10-16T08:44:00Z',
    avatarColor: 'from-indigo-600 to-purple-700'
  },
  {
    id: 'mem-046',
    firstName: 'Jonathan',
    surname: 'Arumero',
    phone: '077 487 0332',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:45:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-047',
    firstName: 'Learnmore',
    surname: 'Kwangware',
    phone: '077 497 8700',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:46:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },

  // --- Page 2 (20261016_105427.jpg) ---
  {
    id: 'mem-048',
    firstName: 'Manyara',
    surname: 'Chigwagwa',
    phone: '077 319 9736',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:47:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-049',
    firstName: 'Maria',
    surname: 'Pemiwa',
    phone: '077 439 0500',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:48:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-050',
    firstName: 'Maria Tichayeva',
    surname: 'Tembo',
    phone: '077 974 3016',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:49:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-051',
    firstName: 'Maxwell',
    surname: 'Mangoro',
    phone: '077 256 5627',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:50:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-052',
    firstName: 'Melissa',
    surname: 'Muzhingi',
    phone: '078 790 0503',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:51:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-053',
    firstName: 'Melon',
    surname: 'Makusha',
    phone: '077 725 8910',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:52:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-054',
    firstName: 'Mercilyna',
    surname: 'Maririmba',
    phone: '077 856 4317',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:53:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-055',
    firstName: 'Michael',
    surname: 'Chakani',
    phone: '077 611 4151',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:54:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-056',
    firstName: 'Michelle',
    surname: 'Muchenje',
    phone: '078 086 6907',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:55:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-057',
    firstName: 'Moses Tafadzwa',
    surname: 'Tiki',
    phone: '077 428 3442',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:56:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-058',
    firstName: 'Munashe',
    surname: 'Mushangwe',
    phone: '077 933 1916',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:57:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-059',
    firstName: 'Musafare',
    surname: 'Chizhande',
    phone: '077 268 0662',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T08:58:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-060',
    firstName: 'Natasha A',
    surname: 'Muponda',
    phone: '078 038 1790',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T08:59:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-061',
    firstName: 'Nelia',
    surname: 'Gotora',
    phone: '077 798 7622',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T09:00:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-062',
    firstName: 'Nico',
    surname: 'Chademana',
    phone: '078 735 3318',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:01:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-063',
    firstName: 'Noel Nyasha',
    surname: 'Msindo',
    phone: '077 444 8727',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:02:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-064',
    firstName: 'Nyasha',
    surname: 'Kumurai',
    phone: '077 293 8668',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:03:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-065',
    firstName: 'Nyasha Mike',
    surname: 'Munyaka',
    phone: '078 365 6692',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:04:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-066',
    firstName: 'Odia',
    surname: 'Loko',
    phone: '077 285 8701',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T09:05:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-067',
    firstName: 'Owen',
    surname: 'Zhoora',
    phone: '077 660 8945',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:06:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-068',
    firstName: 'Passmore',
    surname: 'Magwada',
    phone: '077 253 8032',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:07:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-069',
    firstName: 'Patience',
    surname: 'Chapungu',
    phone: '077 249 8437',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:08:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-070',
    firstName: 'Paul',
    surname: 'Tandi',
    phone: '078 229 3121',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:09:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-071',
    firstName: 'Portia',
    surname: 'Denhere',
    phone: '077 986 0057',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:10:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-072',
    firstName: 'Precious',
    surname: 'Gumbie',
    phone: '077 277 6340',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:11:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-073',
    firstName: 'Precious',
    surname: 'Kabwato',
    phone: '077 252 8333',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:12:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-074',
    firstName: 'Priviledge',
    surname: 'Gudza',
    phone: '077 989 8585',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:13:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-075',
    firstName: 'Privilege',
    surname: 'Makotore',
    phone: '077 517 5133',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:14:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-076',
    firstName: 'Progress',
    surname: 'Gaba',
    phone: '077 160 5574',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:15:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-077',
    firstName: 'Ricky',
    surname: 'Manenge',
    phone: '077 921 6367',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:16:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-078',
    firstName: 'Rudo',
    surname: 'Makumbe',
    phone: '077 741 2635',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:17:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-079',
    firstName: 'Rumbidzai',
    surname: 'Dube',
    phone: '077 881 4841',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:18:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-080',
    firstName: 'Ruvimbo',
    surname: 'Mataure',
    phone: '078 622 2915',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:19:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-081',
    firstName: 'Sarudzai',
    surname: 'Mashanga',
    phone: '077 953 2998',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:20:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-082',
    firstName: 'Shalom',
    surname: 'Masuku',
    phone: '077 690 5960',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:21:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-083',
    firstName: 'Sharon Fadzayi',
    surname: 'Borerwe',
    phone: '077 344 7550',
    role: 'Member',
    status: 'active', // Checked on sheet
    createdAt: '2026-10-16T09:22:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-084',
    firstName: 'Shumirai',
    surname: 'Paradzai',
    phone: '077 749 6413',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:23:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-085',
    firstName: 'Shupikayi',
    surname: 'Mashumba',
    phone: '078 240 3407',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:24:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-086',
    firstName: 'Tafadzwa',
    surname: 'Korongwe',
    phone: '078 979 3432',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:25:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-087',
    firstName: 'Teddy Tawanda',
    surname: 'Mangenje',
    phone: '077 825 7743',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:26:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'mem-088',
    firstName: 'Tendai',
    surname: 'Kanyangira',
    phone: '078 583 2261',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:27:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-089',
    firstName: 'Tendayi',
    surname: 'Mafandizvo',
    phone: '077 306 5554',
    role: 'Member',
    status: 'inactive',
    notes: 'Alternative phone on sheet: 787247249',
    createdAt: '2026-10-16T09:28:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-090',
    firstName: 'Tinashe Grahmn',
    surname: 'Sakarombe',
    phone: '077 441 1184',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:29:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-091',
    firstName: 'Tinodaishe',
    surname: 'Undi',
    phone: '078 784 4429',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:30:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'mem-092',
    firstName: 'Tsitsi',
    surname: 'Langeveldt',
    phone: '077 706 9822',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:31:00Z',
    avatarColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 'mem-093',
    firstName: 'Victor',
    surname: 'Bunza',
    phone: '078 066 2665',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:32:00Z',
    avatarColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'mem-094',
    firstName: 'Vonayi',
    surname: 'Jaricha',
    phone: '077 322 8876',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:33:00Z',
    avatarColor: 'from-rose-600 to-red-700'
  },
  {
    id: 'mem-095',
    firstName: 'Walter',
    surname: 'Muza',
    phone: '077 765 8593',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:34:00Z',
    avatarColor: 'from-cyan-600 to-blue-700'
  },

  // --- Page 3 (20261016_105441.jpg) ---
  {
    id: 'mem-096',
    firstName: 'Welington',
    surname: 'Chitimbe',
    phone: '078 212 3096',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:35:00Z',
    avatarColor: 'from-violet-600 to-indigo-800'
  },
  {
    id: 'mem-097',
    firstName: 'Yvonne',
    surname: 'Musuka',
    phone: '077 546 0171',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:36:00Z',
    avatarColor: 'from-teal-600 to-cyan-700'
  },
  {
    id: 'mem-098',
    firstName: 'Zvipo Caroline',
    surname: 'Dube',
    phone: '077 368 2433',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:37:00Z',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'mem-099',
    firstName: 'Anistance',
    surname: 'Bopoto',
    phone: '078 501 7627',
    role: 'Member',
    status: 'inactive',
    createdAt: '2026-10-16T09:38:00Z',
    avatarColor: 'from-emerald-600 to-teal-700'
  }
];

// Alias for backwards-compatibility
export const INITIAL_MEMBERS = EXACT_IMAGE_MEMBERS;
