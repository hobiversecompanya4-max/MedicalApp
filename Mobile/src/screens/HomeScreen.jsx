import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors } from "../theme";

import BrandHeader from "../components/BrandHeader";
import HeroSection from "../components/HeroSection";
import HowToOrderSection from "../components/HowToOrderSection";
import FAQSection from "../components/FAQSection";
import PartnersSection from "../components/PartnersSection";
import StoreLocationSection from "../components/StoreLocationSection";
import FooterSection from "../components/FooterSection";

/**
 * Home screen — the web app's Home page (Navbar + Hero + HowToOrder
 * + FAQ + OtherPartners + StoreLocation + Footer) combined into one
 * scrollable mobile layout.
 */
export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <BrandHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HeroSection />
        <HowToOrderSection />
        <FAQSection />
        <PartnersSection />
        <StoreLocationSection />
        <FooterSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: 24,
  },
});