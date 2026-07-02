/* FINAL NAV + LEFT HERO FIX */

.navbar {
  background: linear-gradient(135deg, #06142c, #0a2347);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
}

.brandNumber {
  color: white;
}

.navLinks {
  color: rgba(255, 255, 255, 0.82);
}

.navLinks a:first-child {
  color: white;
}

.currencyDropdown {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border-color: rgba(255, 255, 255, 0.22);
}

.mainLayout {
  margin-top: 1.1rem;
}

.hero {
  padding: 1.45rem 1.55rem;
  max-height: none;
}

.hero h1 {
  font-size: clamp(2.7rem, 3.4vw, 4.25rem);
  line-height: 0.93;
  letter-spacing: -0.055em;
}

.hero h1 span {
  font-size: 1.18em;
  margin-top: 0.05rem;
}

.heroLead {
  margin: 0.85rem 0 1rem;
  font-size: 1.12rem;
}

.heroInsights {
  gap: 0.72rem;
}

.heroInsight {
  grid-template-columns: 38px 1fr;
  gap: 0.7rem;
}

.heroInsight span {
  width: 34px;
  height: 34px;
  font-size: 0.9rem;
}

.heroInsight p {
  font-size: 0.78rem;
  line-height: 1.25;
}

.heroInsight small {
  font-size: 0.74rem;
  line-height: 1.2;
}

.thisPaydayCard {
  margin-top: 0.95rem;
  padding: 0.85rem;
}

.thisPaydayCard p {
  font-size: 0.86rem;
}

.thisPaydayCard em {
  font-size: 1.2rem;
}

.topGrid {
  align-items: stretch;
}

.calculatorCard,
.projectionCard {
  min-height: 0;
}
