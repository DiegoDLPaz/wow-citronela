import { backgrounds, icons } from "../../assets-map";
import { TalentData } from "../../pages/dashboard/pages/character-page/interfaces/talent.interface";
import { talentText} from "../utils";

const CLASS_KEY = 'priest';
const bg = (k: string) => backgrounds[CLASS_KEY][k];
const ic = (k: string) => icons[CLASS_KEY][k];

export const data: TalentData = {
  Discipline: {
    name: "Discipline",
    background: bg("discipline"),
    icon: ic("spell_holy_wordfortitude"),
    talents: {
      "Unbreakable Will": {
        name: "Unbreakable Will",
        pos: "a2",
        icon: ic("spell_magic_magearmor"),
        maxRank: 5,
        reqPoints: 0,
        description: talentText`Increases your chance to resist Stun, Fear, and Silence effects by an additional ${[
          3,
          6,
          9,
          12,
          15,
        ]}%.`,
      },
      "Wand Specialization": {
        name: "Wand Specialization",
        pos: "a3",
        icon: ic("inv_wand_01"),
        maxRank: 5,
        reqPoints: 0,
        description: talentText`Increases your damage with Wands by ${[
          5,
          10,
          15,
          20,
          25,
        ]}%.`,
      },
      "Silent Resolve": {
        name: "Silent Resolve",
        pos: "b1",
        icon: ic("spell_nature_manaregentotem"),
        maxRank: 5,
        reqPoints: 5,
        description: talentText`Reduces the threat generated by your spells by ${[
          4,
          8,
          12,
          16,
          20,
        ]}%.`,
      },
      "Improved Power Word: Fortitude": {
        name: "Improved Power Word: Fortitude",
        pos: "b2",
        icon: ic("spell_holy_wordfortitude"),
        maxRank: 2,
        reqPoints: 5,
        description: talentText`Increases the effect of your Power Word: Fortitude and Prayer of Fortitude spells by ${[
          15,
          30,
        ]}%.`,
      },
      "Improved Power Word: Shield": {
        name: "Improved Power Word: Shield",
        pos: "b3",
        icon: ic("spell_holy_powerwordshield"),
        maxRank: 3,
        reqPoints: 5,
        description: talentText`Increases damage absorbed by your Power Word: Shield by ${[
          5,
          10,
          15,
        ]}%.`,
      },
      Martyrdom: {
        name: "Martyrdom",
        pos: "b4",
        icon: ic("spell_nature_tranquility"),
        maxRank: 2,
        reqPoints: 5,
        description: talentText`Gives you a ${[
          50,
          100,
        ]}% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike. The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by ${[
          10,
          20,
        ]}%.`,
      },
      "Inner Focus": {
        name: "Inner Focus",
        pos: "c2",
        icon: ic("spell_frost_windwalkon"),
        maxRank: 1,
        reqPoints: 10,
        description: talentText`When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25% if it is capable of a critical effect.`,
      },
      Meditation: {
        name: "Meditation",
        pos: "c3",
        icon: ic("spell_nature_sleep"),
        maxRank: 3,
        reqPoints: 10,
        description: talentText`Allows ${[
          5,
          10,
          15,
        ]}% of your Mana regeneration to continue while casting.`,
      },
      "Improved Inner Fire": {
        name: "Improved Inner Fire",
        pos: "d1",
        icon: ic("spell_holy_innerfire"),
        maxRank: 3,
        reqPoints: 15,
        description: talentText`Increases the Armor bonus of your Inner Fire spell by ${[
          10,
          20,
          30,
        ]}%.`,
      },
      "Mental Agility": {
        name: "Mental Agility",
        pos: "d2",
        icon: ic("ability_hibernation"),
        maxRank: 5,
        reqPoints: 15,
        description: talentText`Reduces the Mana cost of your instant cast spells by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%`,
      },
      "Improved Mana Burn": {
        name: "Improved Mana Burn",
        pos: "d4",
        icon: ic("spell_shadow_manaburn"),
        maxRank: 2,
        reqPoints: 15,
        description: talentText`Reduces the casting time of your Mana Burn spell by ${[
          0.25,
          0.5,
        ]} sec.`,
      },
      "Mental Strength": {
        name: "Mental Strength",
        pos: "e2",
        icon: ic("spell_nature_enchantarmor"),
        maxRank: 5,
        reqPoints: 20,
        description: talentText`Increases your maximum Mana by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%.`,
      },
      "Divine Spirit": {
        name: "Divine Spirit",
        pos: "e3",
        icon: ic("spell_holy_divinespirit"),
        maxRank: 1,
        reqPoints: 20,
        prereq: "Meditation",
        arrows: [{ dir: "down", from: "c3", to: "e3" }],
        description: talentText`Holy power infuses the target, increasing their Spirit by 17 for 30 min.`,
      },
      "Force of Will": {
        name: "Force of Will",
        pos: "f3",
        icon: ic("spell_nature_slowingtotem"),
        maxRank: 5,
        reqPoints: 25,
        description: talentText`Increases your spell damage by ${[
          1,
          2,
          3,
          4,
          5,
        ]}% and the critical strike chance of your offensive spells by ${[
          1,
          2,
          3,
          4,
          5,
        ]}%.`,
      },
      "Power Infusion": {
        name: "Power Infusion",
        pos: "g2",
        icon: ic("spell_holy_powerinfusion"),
        maxRank: 1,
        reqPoints: 30,
        prereq: "Mental Strength",
        arrows: [{ dir: "down", from: "e2", to: "g2" }],
        description: talentText`Infuses the target with power, increasing their spell damage and healing by 20%. Lasts 15 sec.`,
      },
    },
  },
  Holy: {
    name: "Holy",
    background: bg("holy"),
    icon: ic("spell_holy_holybolt"),
    talents: {
      "Healing Focus": {
        name: "Healing Focus",
        pos: "a1",
        icon: ic("spell_holy_healingfocus"),
        maxRank: 2,
        reqPoints: 0,
        description: talentText`Gives you a ${[
          35,
          70,
        ]}% chance to avoid interruption caused by damage while casting any healing spell.`,
      },
      "Improved Renew": {
        name: "Improved Renew",
        pos: "a2",
        icon: ic("spell_holy_renew"),
        maxRank: 3,
        reqPoints: 0,
        description: talentText`Increases the amount healed by your Renew spell by ${[
          5,
          10,
          15,
        ]}%.`,
      },
      "Holy Specialization": {
        name: "Holy Specialization",
        pos: "a3",
        icon: ic("spell_holy_sealofsalvation"),
        maxRank: 5,
        reqPoints: 0,
        description: talentText`Increases the critical effect chance of your Holy spells by ${[
          1,
          2,
          3,
          4,
          5,
        ]}%.`,
      },
      "Spell Warding": {
        name: "Spell Warding",
        pos: "b2",
        icon: ic("spell_holy_spellwarding"),
        maxRank: 5,
        reqPoints: 5,
        description: talentText`Reduces all spell damage taken by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%.`,
      },
      "Divine Fury": {
        name: "Divine Fury",
        pos: "b3",
        icon: ic("spell_holy_sealofwrath"),
        maxRank: 5,
        reqPoints: 5,
        description: talentText`Reduces the casting time of your Smite, Holy Fire and Greater Heal spells by ${[
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
        ]} sec.`,
      },
      "Holy Nova": {
        name: "Holy Nova",
        pos: "c1",
        icon: ic("spell_holy_holynova"),
        maxRank: 1,
        reqPoints: 10,
        description: talentText`Causes an explosion of holy light around the caster, causing 29 to 34 Holy damageto all enemy targets within 10 yards and healing all party members within 10 yards for 54 to 63. These effects cause no threat.`,
      },
      "Blessed Recovery": {
        name: "Blessed Recovery",
        pos: "c2",
        icon: ic("spell_holy_blessedrecovery"),
        maxRank: 3,
        reqPoints: 10,
        description: talentText`After being struck by a melee or ranged critical hit, heal ${[
          8,
          16,
          25,
        ]}% of the damage taken over 6 sec.`,
      },
      Inspiration: {
        name: "Inspiration",
        pos: "c4",
        icon: ic("spell_holy_layonhands"),
        maxRank: 3,
        reqPoints: 10,
        description: talentText`Increase your target's armor by ${[
          8,
          16,
          25,
        ]}% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.`,
      },
      "Holy Reach": {
        name: "Holy Reach",
        pos: "d1",
        icon: ic("spell_holy_purify"),
        maxRank: 2,
        reqPoints: 15,
        description: talentText`Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by ${[
          10,
          20,
        ]}%.`,
      },
      "Improved Healing": {
        name: "Improved Healing",
        pos: "d2",
        icon: ic("spell_holy_heal02"),
        maxRank: 3,
        reqPoints: 15,
        description: talentText`Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by ${[
          5,
          10,
          15,
        ]}%`,
      },
      "Searing Light": {
        name: "Searing Light",
        pos: "d3",
        icon: ic("spell_holy_searinglightpriest"),
        maxRank: 2,
        reqPoints: 15,
        prereq: "Divine Fury",
        arrows: [{ dir: "down", from: "b3", to: "d3" }],
        description: talentText`Increases the damage of your Smite and Holy Fire spells by ${[
          5,
          10,
        ]}%.`,
      },
      "Improved Prayer of Healing": {
        name: "Improved Prayer of Healing",
        pos: "e1",
        icon: ic("spell_holy_prayerofhealing02"),
        maxRank: 2,
        reqPoints: 20,
        description: talentText`Reduces the Mana cost of your Prayer of Healing spell by ${[
          10,
          20,
        ]}%.`,
      },
      "Spirit of Redemption": {
        name: "Spirit of Redemption",
        pos: "e2",
        icon: ic("inv_enchant_essenceeternallarge"),
        maxRank: 1,
        reqPoints: 20,
        description: talentText`Upon death, the priest becomes the Spirit of Redemption for 10 sec. The Spirit of Redemption cannot move, attack, be attacked or targeted any spells or effects. While in this form the priest can cast any healing spell free of cost. When the effect ends, the priest dies.`,
      },
      "Spiritual Guidance": {
        name: "Spiritual Guidance",
        pos: "e3",
        icon: ic("spell_holy_spiritualguidence"),
        maxRank: 5,
        reqPoints: 20,
        description: talentText`Increases spell damage and healing by up to ${[
          5,
          10,
          15,
          20,
          25,
        ]}% of your total Spirit.`,
      },
      "Spiritual Healing": {
        name: "Spiritual Healing",
        pos: "f3",
        icon: ic("spell_nature_moonglow"),
        maxRank: 5,
        reqPoints: 25,
        description: talentText`Increases the amount healed by your healing spells by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%.`,
      },
      Lightwell: {
        name: "Lightwell",
        pos: "g2",
        icon: ic("spell_holy_summonlightwell"),
        maxRank: 1,
        reqPoints: 30,
        prereq: "Spirit of Redemption",
        arrows: [{ dir: "down", from: "e2", to: "g2" }],
        description: talentText`Creates a holy Lightwell near the priest. Members of your raid or party can click the Lightwell to restore 800 health over 10 sec. Being attacked cancels the effect. Lightwell lasts for 3 min or 5 charges.`,
      },
    },
  },
  Shadow: {
    name: "Shadow",
    background: bg("shadow"),
    icon: ic("spell_shadow_shadowwordpain"),
    talents: {
      "Spirit Tap": {
        name: "Spirit Tap",
        pos: "a2",
        icon: ic("spell_shadow_requiem"),
        maxRank: 5,
        reqPoints: 0,
        description: talentText`Gives you a ${[
          20,
          40,
          60,
          80,
          100,
        ]}% chance to gain a 100% bonus to your Spirit after killing a target that yields experience. For the duration, your Mana will regenerate at a 50% rate while casting. Lasts 15 sec.`,
      },
      Blackout: {
        name: "Blackout",
        pos: "a3",
        icon: ic("spell_shadow_gathershadows"),
        maxRank: 5,
        reqPoints: 0,
        description: talentText`Gives your Shadow damage spells a ${[
          2,
          4,
          6,
          8,
          10,
        ]}% chance to stun the target for 3s.`,
      },
      "Shadow Affinity": {
        name: "Shadow Affinity",
        pos: "b1",
        icon: ic("spell_shadow_shadowward"),
        maxRank: 3,
        reqPoints: 5,
        description: talentText`Reduces the threat generated by your Shadow spells by ${[
          8,
          16,
          25,
        ]}%.`,
      },
      "Improved Shadow Word: Pain": {
        name: "Improved Shadow Word: Pain",
        pos: "b2",
        icon: ic("spell_shadow_shadowwordpain"),
        maxRank: 2,
        reqPoints: 5,
        description: talentText`Increases the duration of your Shadow Word: Pain spell by ${[
          3,
          6,
        ]} sec.`,
      },
      "Shadow Focus": {
        name: "Shadow Focus",
        pos: "b3",
        icon: ic("spell_shadow_burningspirit"),
        maxRank: 5,
        reqPoints: 5,
        description: talentText`Reduces your target's chance to resist your Shadow spells by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%.`,
      },
      "Improved Psychic Scream": {
        name: "Improved Psychic Scream",
        pos: "c1",
        icon: ic("spell_shadow_psychicscream"),
        maxRank: 2,
        reqPoints: 10,
        description: talentText`Reduces the cooldown of your Psychic Scream spell by ${[
          2,
          4,
        ]} sec.`,
      },
      "Improved Mind Blast": {
        name: "Improved Mind Blast",
        pos: "c2",
        icon: ic("spell_shadow_unholyfrenzy"),
        maxRank: 5,
        reqPoints: 10,
        description: talentText`Reduces the cooldown of your Mind Blast spell by ${[
          0.5,
          1,
          1.5,
          2,
          2.5,
        ]} sec.`,
      },
      "Mind Flay": {
        name: "Mind Flay",
        pos: "c3",
        icon: ic("spell_shadow_siphonmana"),
        maxRank: 1,
        reqPoints: 10,
        description: talentText`Assault the target's mind with Shadow energy, causing 75 Shadow damage over 3 sec and slowing their movement speed by 50%.`,
      },
      "Improved Fade": {
        name: "Improved Fade",
        pos: "d2",
        icon: ic("spell_magic_lesserinvisibilty"),
        maxRank: 2,
        reqPoints: 15,
        description: talentText`Decreases the cooldown of your Fade ability by ${[
          3,
          6,
        ]} sec.`,
      },
      "Shadow Reach": {
        name: "Shadow Reach",
        pos: "d3",
        icon: ic("spell_shadow_chilltouch"),
        maxRank: 3,
        reqPoints: 15,
        description: talentText`Increases the range of your Shadow spells by ${[
          6,
          13,
          20,
        ]}%.`,
      },
      "Shadow Weaving": {
        name: "Shadow Weaving",
        pos: "d4",
        icon: ic("spell_shadow_blackplague"),
        maxRank: 5,
        reqPoints: 15,
        description: talentText`Your Shadow damage spells have a ${[
          20,
          40,
          60,
          80,
          100,
        ]}% chance to cause your target to be vulnerable to Shadow damage. This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec. Stacks up to 5 times.`,
      },
      Silence: {
        name: "Silence",
        pos: "e1",
        icon: ic("spell_shadow_impphaseshift"),
        maxRank: 1,
        reqPoints: 20,
        prereq: "Improved Psychic Scream",
        arrows: [{ dir: "down", from: "c1", to: "e1" }],
        description: talentText`Silences the target, preventing them from casting spells for 5 sec.`,
      },
      "Vampiric Embrace": {
        name: "Vampiric Embrace",
        pos: "e2",
        icon: ic("spell_shadow_unsummonbuilding"),
        maxRank: 1,
        reqPoints: 20,
        description: talentText`Afflicts your target with Shadow energy that causes all party members to be healed for 20% of any Shadow spell damage you deal for 1 min.`,
      },
      "Improved Vampiric Embrace": {
        name: "Improved Vampiric Embrace",
        pos: "e3",
        icon: ic("spell_shadow_improvedvampiricembrace"),
        maxRank: 2,
        reqPoints: 20,
        prereq: "Vampiric Embrace",
        arrows: [{ dir: "right", from: "e2", to: "e3" }],
        description: talentText`Increases the percentage healed by Vampiric Embrace by an additional ${[
          5,
          10,
        ]}%.`,
      },
      Darkness: {
        name: "Darkness",
        pos: "f3",
        icon: ic("spell_shadow_twilight"),
        maxRank: 5,
        reqPoints: 25,
        description: talentText`Increases your Shadow spell damage by ${[
          2,
          4,
          6,
          8,
          10,
        ]}%.`,
      },
      Shadowform: {
        name: "Shadowform",
        pos: "g2",
        icon: ic("spell_shadow_shadowform"),
        maxRank: 1,
        reqPoints: 30,
        prereq: "Vampiric Embrace",
        arrows: [{ dir: "down", from: "e2", to: "g2" }],
        description: talentText`Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%. However, you may not cast Holy spells while in this form.`,
      },
    },
  },
};
