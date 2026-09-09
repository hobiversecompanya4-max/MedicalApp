import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, shadows } from "../theme";
import { STORE_PHONE } from "../config";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "Can I order medicines without an official prescription?",
    answer:
      "Over-the-counter products such as vitamins, antacids, first-aid items, and monitoring tools do not require a prescription. Prescription medicines still need a valid prescription from a licensed healthcare professional.",
  },
  {
    question: "How will I know when my prescription has been verified?",
    answer:
      "Once our pharmacy team reviews your prescription, your order status is updated so you can track the verification progress without guesswork.",
  },
  {
    question: "What happens if my doctor prescribed a high-cost brand medicine?",
    answer:
      "Our pharmacists can check available alternatives and let you know whether an approved generic or lower-cost option is suitable for your prescription.",
  },
  {
    question: "How are cold-storage items like insulin transported?",
    answer:
      "Temperature-sensitive medicines are packed using appropriate insulated packaging and monitored during delivery to help maintain the required cold-chain conditions.",
  },
];

/**
 * FAQ accordion, ported from FAQ.jsx.
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <View style={styles.section}>
      <SectionHeading
        pill="Clarifications & guidance"
        title="Frequently asked questions"
        subtitle="A quick guide to ordering, verification, and delivery so the experience feels clear from the start."
      />

      <View style={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <View key={faq.question} style={styles.item}>
              <Pressable onPress={() => toggleFAQ(index)} style={styles.questionRow}>
                <Text style={styles.question}>{faq.question}</Text>
                <View
                  style={[
                    styles.chevronBox,
                    isOpen && { transform: [{ rotate: "180deg" }] },
                  ]}
                >
                  <Ionicons name="chevron-down" size={17} color={colors.brandStrong} />
                </View>
              </Pressable>

              {isOpen ? (
                <View style={styles.answerWrap}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Call-to-action card */}
      <View style={styles.ctaCard}>
        <View style={styles.ctaIcon}>
          <Ionicons name="call" size={19} color={colors.brand} />
        </View>
        <View style={styles.ctaTextWrap}>
          <Text style={styles.ctaTitle}>Still have a question about your medication?</Text>
          <Text style={styles.ctaSubtitle}>
            Our pharmacist support line is ready to help with orders and guidance.
          </Text>
        </View>
        <Pressable
          style={styles.ctaButton}
          onPress={() => Linking.openURL(`tel:${STORE_PHONE}`)}
        >
          <Text style={styles.ctaButtonText}>Call Pharmacist</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  list: {
    gap: 10,
  },
  item: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.92)",
    overflow: "hidden",
    ...shadows.card,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  answerWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.surface2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  answer: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.text,
  },
  ctaCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.brandSoft,
    padding: 16,
    flexWrap: "wrap",
  },
  ctaIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTextWrap: {
    flex: 1,
    minWidth: 160,
  },
  ctaTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.ink,
  },
  ctaSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: colors.text,
  },
  ctaButton: {
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
});