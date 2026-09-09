import React from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, shadows } from "../theme";
import { STORE_CONTACT } from "../config";
import ScreenHeader from "../components/ScreenHeader";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";

const socialLinks = [
  { label: "Instagram", handle: "@yourmedicalstore", url: STORE_CONTACT.social.instagram, icon: "logo-instagram", tint: "#db2777", bg: colors.roseSoft },
  { label: "Facebook", handle: "Your Medical Store", url: STORE_CONTACT.social.facebook, icon: "logo-facebook", tint: colors.brand, bg: colors.brandSoft },
  { label: "X / Twitter", handle: "@yourmedicalstore", url: STORE_CONTACT.social.twitter, icon: "logo-twitter", tint: colors.ink, bg: colors.surface2 },
  { label: "YouTube", handle: "Your Medical Store", url: STORE_CONTACT.social.youtube, icon: "logo-youtube", tint: "#dc2626", bg: "#fef2f2" },
];

function ContactRow({ icon, title, value, note, onPress, tint, bg }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.contactRow, pressed && styles.pressed]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.contactIcon, { backgroundColor: bg || colors.brandSoft }]}>
        <Ionicons name={icon} size={20} color={tint || colors.brand} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactValue}>{value}</Text>
        {note ? <Text style={styles.contactNote}>{note}</Text> : null}
      </View>
      {onPress ? <Ionicons name="chevron-forward" size={17} color={colors.textLight} /> : null}
    </Pressable>
  );
}

/**
 * Contact screen, ported from ContactSection.jsx.
 */
export default function ContactScreen() {
  const { phone, email, mapUrl } = STORE_CONTACT;
  const whatsappUrl = `https://wa.me/${STORE_CONTACT.whatsapp}`;

  return (
    <View style={styles.wrap}>
      <ScreenHeader title="Contact Us" subtitle="We're here to help" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeading
          pill="Contact Us"
          title="We're Here to Help You"
          subtitle="Have a question about medicines, prescriptions, or your order? Get in touch with us and our team will be happy to help."
        />

        {/* Contact info card */}
        <View style={styles.infoCard}>
          <ContactRow
            icon="call"
            title="Call Us"
            value={phone}
            note="Available during store hours"
            onPress={() => Linking.openURL(`tel:${phone}`)}
          />
          <ContactRow
            icon="logo-whatsapp"
            title="WhatsApp"
            value={phone}
            note="Quick assistance & order enquiries"
            onPress={() => Linking.openURL(whatsappUrl)}
            tint="#16a34a"
            bg="#f0fdf4"
          />
          <ContactRow
            icon="mail"
            title="Email"
            value={email}
            note="We'll get back to you as soon as possible"
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
          <ContactRow
            icon="location"
            title="Store Address"
            value="Your Medical Store, Lucknow, Uttar Pradesh, India"
            note="Get Directions ↗"
            onPress={() => Linking.openURL(mapUrl)}
          />
          <View style={styles.contactRow}>
            <View style={[styles.contactIcon, { backgroundColor: "#ffedd5" }]}>
              <Ionicons name="time" size={20} color="#ea580c" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Opening Hours</Text>
              <Text style={styles.contactValue}>{STORE_CONTACT.hours}</Text>
              <Text style={styles.contactNote}>{STORE_CONTACT.hoursTime} · Open daily</Text>
            </View>
          </View>
        </View>

        {/* Assistance card */}
        <View style={styles.assistCard}>
          <View style={styles.assistIcon}>
            <Ionicons name="paper-plane" size={22} color={colors.white} />
          </View>
          <Text style={styles.assistTitle}>Need Assistance?</Text>
          <Text style={styles.assistText}>
            Our team is ready to help you with medicine availability, prescription
            orders, delivery information, and general queries.
          </Text>
          <View style={styles.assistButtons}>
            <PrimaryButton
              title="Call Now"
              variant="light"
              icon={<Ionicons name="call" size={17} color={colors.brand} />}
              style={styles.assistBtn}
              onPress={() => Linking.openURL(`tel:${phone}`)}
            />
            <Pressable
              style={styles.whatsappBtn}
              onPress={() => Linking.openURL(whatsappUrl)}
            >
              <Ionicons name="logo-whatsapp" size={17} color={colors.white} />
              <Text style={styles.whatsappBtnText}>WhatsApp</Text>
            </Pressable>
          </View>
        </View>

        {/* Social */}
        <View style={styles.socialCard}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <Text style={styles.socialSubtitle}>
            Stay connected with us for updates, offers, health tips, and the
            latest information.
          </Text>
          <View style={styles.socialGrid}>
            {socialLinks.map((item) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => [styles.socialRow, pressed && styles.pressed]}
                onPress={() => Linking.openURL(item.url)}
              >
                <View style={[styles.socialIcon, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={19} color={item.tint} />
                </View>
                <View>
                  <Text style={styles.socialLabel}>{item.label}</Text>
                  <Text style={styles.socialHandle}>{item.handle}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Store map */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <View style={styles.mapHeaderText}>
              <Text style={styles.mapTitle}>Visit Our Store</Text>
              <Text style={styles.mapSubtitle}>
                Find us easily and get directions through Google Maps.
              </Text>
            </View>
          </View>
          <Pressable style={styles.mapButton} onPress={() => Linking.openURL(mapUrl)}>
            <Ionicons name="map" size={17} color={colors.white} />
            <Text style={styles.mapButtonText}>Open in Google Maps</Text>
          </Pressable>
          <View style={styles.mapPreview}>
            <Image
              source={require("../../assets/hero.png")}
              style={styles.mapPreviewImg}
            />
            <View style={styles.mapPreviewOverlay}>
              <Ionicons name="location" size={26} color={colors.white} />
            </View>
          </View>
        </View>

        {/* Bottom strip */}
        <View style={styles.bottomStrip}>
          <Text style={styles.bottomTitle}>Have a question?</Text>
          <Text style={styles.bottomText}>Our team is just a call or message away.</Text>
          <View style={styles.bottomActions}>
            <PrimaryButton
              title="Call Us"
              variant="light"
              icon={<Ionicons name="call" size={15} color={colors.ink} />}
              style={styles.bottomBtn}
              onPress={() => Linking.openURL(`tel:${phone}`)}
            />
            <Pressable
              style={styles.emailBtn}
              onPress={() => Linking.openURL(`mailto:${email}`)}
            >
              <Ionicons name="mail" size={15} color={colors.white} />
              <Text style={styles.emailBtnText}>Email Us</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  infoCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    padding: 6,
    marginBottom: 14,
    gap: 2,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: radius.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  contactValue: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
    color: colors.ink,
  },
  contactNote: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textLight,
  },
  assistCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.brand,
    padding: 20,
    marginBottom: 14,
    ...shadows.brand,
  },
  assistIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  assistTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "800",
    color: colors.white,
  },
  assistText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: colors.brandSoft2,
  },
  assistButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  assistBtn: {
    flex: 1,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  whatsappBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  socialCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 14,
    ...shadows.card,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  socialSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },
  socialGrid: {
    marginTop: 14,
    gap: 10,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 12,
  },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  socialLabel: {
    fontSize: 11,
    color: colors.textLight,
  },
  socialHandle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
  },
  mapCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 18,
    marginBottom: 14,
    ...shadows.card,
  },
  mapHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  mapHeaderText: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  mapSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: colors.text,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 46,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    marginBottom: 14,
  },
  mapButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  mapPreview: {
    height: 170,
    borderRadius: radius.lg,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  mapPreviewImg: {
    width: "100%",
    height: "100%",
  },
  mapPreviewOverlay: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brand,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomStrip: {
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
    padding: 18,
    alignItems: "center",
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
  },
  bottomText: {
    marginTop: 3,
    fontSize: 13,
    color: "#9ca3af",
  },
  bottomActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    alignSelf: "stretch",
  },
  bottomBtn: {
    flex: 1,
  },
  emailBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#4b5563",
  },
  emailBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});