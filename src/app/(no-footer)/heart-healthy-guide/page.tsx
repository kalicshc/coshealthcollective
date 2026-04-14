"use client";

export default function HeartHealthyGuide() {
  return (
    <div>
      <style>{`
        * { box-sizing: border-box; }
        @media print {
          @page { size: letter; margin: 0.55in 0.6in; }
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; break-after: page; }
        }
        body { background: #f0f0f0; }
        .hh-page { width: 7.3in; min-height: 9.9in; margin: 0.3in auto; background: white; padding: 0.45in 0.5in 0.4in; font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif; color: #1a202c; position: relative; }
        .hh-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.22in; padding-bottom: 0.18in; border-bottom: 4px solid #2b7a7a; }
        .hh-header-left { display: flex; align-items: center; gap: 12px; }
        .hh-logo { width: 58px; height: 58px; object-fit: contain; }
        .hh-org-name { font-size: 12.5px; font-weight: 700; color: #2b7a7a; line-height: 1.35; }
        .hh-org-contact { font-size: 10px; color: #718096; margin-top: 2px; }
        .hh-header-right { text-align: right; }
        .hh-title { font-size: 22px; font-weight: 800; color: #c53030; line-height: 1.15; margin: 0; letter-spacing: -0.3px; }
        .hh-subtitle { font-size: 10.5px; color: #718096; margin-top: 3px; }
        .hh-section-heading { font-size: 11.5px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 14px; }
        .hh-section-heading.green { background: #c6f6d5; color: #22543d; }
        .hh-section-heading.red { background: #fed7d7; color: #742a2a; }
        .hh-section-heading.blue { background: #bee3f8; color: #2a4365; }
        .hh-section-heading.teal { background: #b2f5ea; color: #1d4044; }
        .hh-section-heading.amber { background: #fefcbf; color: #744210; }
        .food-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px; margin-bottom: 14px; }
        .food-item { display: flex; gap: 10px; align-items: flex-start; }
        .food-icon { width: 34px; height: 34px; border-radius: 8px; background: #f0fff4; border: 1.5px solid #9ae6b4; display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; margin-top: 1px; }
        .food-body h3 { font-size: 12px; font-weight: 700; margin: 0 0 1px; color: #1a202c; }
        .food-body .food-dose { font-size: 9.5px; color: #38a169; font-weight: 600; margin-bottom: 3px; }
        .food-body ul { list-style: none; margin: 0; padding: 0; }
        .food-body ul li { font-size: 10.5px; color: #4a5568; line-height: 1.45; padding-left: 10px; position: relative; }
        .food-body ul li::before { content: "·"; position: absolute; left: 2px; color: #38a169; font-size: 14px; line-height: 1.2; }
        .fiber-callout { background: #e6fffa; border: 1.5px solid #81e6d9; border-radius: 10px; padding: 12px 16px; display: flex; gap: 14px; align-items: flex-start; margin-top: 4px; }
        .fiber-callout .fiber-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
        .fiber-callout h3 { font-size: 12px; font-weight: 700; color: #234e52; margin: 0 0 4px; }
        .fiber-callout p { font-size: 10.5px; color: #285e61; margin: 0; line-height: 1.5; }
        .hh-divider { border: none; border-top: 1px solid #e2e8f0; margin: 14px 0; }
        .avoid-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .avoid-card { background: #fff5f5; border: 1.5px solid #feb2b2; border-radius: 10px; padding: 10px 12px; }
        .avoid-card h3 { font-size: 11px; font-weight: 700; color: #742a2a; margin: 0 0 5px; display: flex; align-items: center; gap: 5px; }
        .avoid-card ul { list-style: none; margin: 0; padding: 0; }
        .avoid-card ul li { font-size: 10px; color: #4a5568; line-height: 1.5; padding-left: 12px; position: relative; }
        .avoid-card ul li::before { content: "✕"; position: absolute; left: 0; color: #e53e3e; font-size: 8px; top: 3px; }
        .avoid-card .avoid-tip { font-size: 9.5px; font-style: italic; color: #c53030; margin-top: 4px; padding-left: 0; }
        .avoid-card .avoid-tip::before { display: none; }
        .sample-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 14px; }
        .meal-box { border: 1.5px solid #bee3f8; border-radius: 10px; padding: 10px; background: #ebf8ff; }
        .meal-box h4 { font-size: 10px; font-weight: 800; color: #2b7a7a; text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 6px; }
        .meal-box ul { list-style: none; margin: 0; padding: 0; }
        .meal-box ul li { font-size: 9.5px; color: #2d3748; line-height: 1.4; padding-left: 10px; position: relative; }
        .meal-box ul li::before { content: "•"; position: absolute; left: 1px; color: #4299e1; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .exercise-box { background: #fffaf0; border: 1.5px solid #fbd38d; border-radius: 10px; padding: 12px 14px; }
        .exercise-box ul { list-style: none; margin: 0; padding: 0; }
        .exercise-box ul li { font-size: 10.5px; color: #4a5568; line-height: 1.5; padding-left: 16px; position: relative; margin-bottom: 4px; }
        .exercise-box ul li::before { content: "🏃"; position: absolute; left: 0; font-size: 10px; top: 1px; }
        .tips-box ul { list-style: none; margin: 0; padding: 0; }
        .tips-box ul li { font-size: 10.5px; color: #4a5568; line-height: 1.5; padding-left: 26px; position: relative; margin-bottom: 5px; }
        .tip-num { position: absolute; left: 0; top: 0; width: 18px; height: 18px; background: #2b7a7a; color: white; border-radius: 50%; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .hh-footer { margin-top: 16px; padding-top: 10px; border-top: 1.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
        .hh-footer-left { font-size: 10px; color: #2b7a7a; font-weight: 600; line-height: 1.6; }
        .hh-footer-left span { font-weight: 400; color: #718096; }
        .hh-footer-disclaimer { font-size: 8.5px; color: #a0aec0; text-align: right; line-height: 1.5; }
        .print-btn { position: fixed; bottom: 28px; right: 28px; background: #2b7a7a; color: white; border: none; border-radius: 50px; padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 20px rgba(43,122,122,0.4); font-family: 'Poppins', sans-serif; z-index: 100; }
        .print-btn:hover { background: #276767; }
      `}</style>

      <button className="print-btn no-print" onClick={() => window.print()}>Print / Save as PDF</button>

      {/* PAGE 1 */}
      <div className="hh-page page-break">
        <div className="hh-header">
          <div className="hh-header-left">
            <img src="/logo.png" alt="CSHC Logo" className="hh-logo" />
            <div>
              <div className="hh-org-name">Colorado Springs<br />Health Collective</div>
              <div className="hh-org-contact">(719) 824-4716 · dpc@coshealthcollective.com</div>
            </div>
          </div>
          <div className="hh-header-right">
            <div className="hh-title">Heart Healthy<br />Eating Guide</div>
            <div className="hh-subtitle">Page 1 of 2 — Foods to Add Every Day</div>
          </div>
        </div>

        <div className="hh-section-heading green">✅ &nbsp;Foods to Add Every Day</div>

        <div className="food-grid">
          {[
            { icon: "🥜", name: "Nuts", dose: "~1 oz (23 almonds) daily", tips: ["Almonds, walnuts, pistachios, peanuts, cashews", "Add to oatmeal, salads, or eat as a snack", "Choose unsalted varieties"] },
            { icon: "🥦", name: "Vegetables — especially leafy greens", dose: "At least 2–3 cups daily", tips: ["Spinach, kale, broccoli, Brussels sprouts", "Fresh, frozen, or roasted — all count"] },
            { icon: "🌾", name: "Oats and Barley", dose: "1–2 servings daily", tips: ["Steel-cut or rolled oats (not instant flavored packets)", "Barley in soups or as a side dish instead of rice", "Oat bran added to smoothies or baked goods"] },
            { icon: "🍓", name: "Fruits", dose: "2–3 servings daily", tips: ["Berries (blueberries, strawberries, raspberries)", "Apples, pears, oranges, grapefruit", "Choose whole fruit over juice"] },
            { icon: "🫘", name: "Beans and Legumes", dose: "½ cup daily", tips: ["Black beans, kidney beans, chickpeas, lentils", "Add to salads, soups, tacos, or make hummus", "Try bean-based pasta as a substitute"] },
            { icon: "🫒", name: "Healthy Oils", dose: "Use in place of butter", tips: ["Extra-virgin olive oil for cooking and dressings", "Avocado and avocado oil", "Use instead of butter or margarine"] },
            { icon: "🫛", name: "Soy Foods", dose: "1–2 servings daily", tips: ["Tofu in stir-fries or scrambles", "Edamame as a snack or in salads", "Unsweetened soy milk · Tempeh"] },
          ].map((food) => (
            <div className="food-item" key={food.name}>
              <div className="food-icon">{food.icon}</div>
              <div className="food-body">
                <h3>{food.name}</h3>
                <div className="food-dose">{food.dose}</div>
                <ul>{food.tips.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>

        <hr className="hh-divider" />

        <div className="hh-section-heading teal">💊 &nbsp;Supplements</div>
        <div className="fiber-callout">
          <div className="fiber-icon">💊</div>
          <div>
            <h3>Psyllium Husk Fiber Supplement (e.g. Metamucil)</h3>
            <p>Take <strong>5–10 grams daily</strong> (about 1–2 tablespoons of powder or 4–6 capsules). Take before meals with a full glass of water. Start with a lower dose and increase gradually to avoid bloating or gas. Studies show psyllium can lower LDL cholesterol by <strong>5–10%</strong>.</p>
          </div>
        </div>

        <div className="hh-footer">
          <div className="hh-footer-left">Colorado Springs Health Collective<br /><span>(719) 824-4716 · dpc@coshealthcollective.com · coshealthcollective.com</span></div>
          <div className="hh-footer-disclaimer">For educational purposes only. Not a substitute for medical advice.<br />Discuss dietary changes with your healthcare provider.</div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="hh-page">
        <div className="hh-section-heading red">🚫 &nbsp;Foods to Limit or Avoid</div>
        <div className="avoid-grid">
          {[
            { title: "🧁 Sugary Foods & Drinks", items: ["Soda, sweet tea, lemonade, punch", "Candy, cookies, cakes, pastries", "Ice cream, sweetened yogurt"], tip: "Limit added sugar to <25 g/day (6 tsp)" },
            { title: "🍞 Refined Carbohydrates", items: ["White bread, white rice, regular pasta", "Crackers, chips, pretzels", "Sweetened breakfast cereals"], tip: "Choose whole grain versions instead" },
            { title: "🥩 Saturated Fats", items: ["Fatty cuts of beef, pork, lamb", "Chicken skin, full-fat cheese & cream", "Butter, lard, coconut & palm oil"], tip: null },
            { title: "🍟 Fried Foods", items: ["French fries, fried chicken, onion rings"], tip: "Bake, grill, or air-fry instead" },
            { title: "🌭 Processed Meats", items: ["Bacon, sausage, hot dogs", "Deli meats"], tip: null },
            { title: "🍺 Alcohol", items: ["Raises triglycerides — limit or avoid"], tip: "If you drink: max 1 drink/day" },
          ].map((card) => (
            <div className="avoid-card" key={card.title}>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => <li key={item}>{item}</li>)}
                {card.tip && <li className="avoid-tip">{card.tip}</li>}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hh-divider" />

        <div className="hh-section-heading blue">🍽️ &nbsp;Sample Day of Eating</div>
        <div className="sample-grid">
          {[
            { label: "Breakfast", items: ["Oatmeal with walnuts & blueberries", "Sprinkle of cinnamon", "Psyllium mixed in water", "Unsweetened soy milk"] },
            { label: "Lunch", items: ["Large salad with chickpeas", "Olive oil & vinegar dressing", "Whole grain bread or crackers"] },
            { label: "Snack", items: ["Apple slices with almond butter", "— or —", "Handful of almonds"] },
            { label: "Dinner", items: ["Grilled salmon or tofu", "Roasted vegetables with olive oil", "Barley or quinoa as a side", "Leafy green side salad"] },
            { label: "Dessert", items: ["Fresh berries", "— or —", "Small piece of dark chocolate"] },
          ].map((meal) => (
            <div className="meal-box" key={meal.label}>
              <h4>{meal.label}</h4>
              <ul>{meal.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <hr className="hh-divider" />

        <div className="bottom-grid">
          <div>
            <div className="hh-section-heading amber">🏃 &nbsp;Exercise</div>
            <div className="exercise-box">
              <ul>
                <li>150 min/week of moderate activity (brisk walking, cycling, swimming)</li>
                <li>Strength training 2 days/week (weights, bands, or bodyweight)</li>
                <li>10-minute walks after meals help lower triglycerides</li>
                <li>Find activities you enjoy — consistency matters most</li>
              </ul>
            </div>
          </div>
          <div>
            <div className="hh-section-heading teal">💡 &nbsp;Quick Tips</div>
            <div className="tips-box">
              <ul>
                {[
                  "Start with one change at a time — don't overhaul everything at once",
                  "Read nutrition labels: look for low saturated fat and low added sugars",
                  "Cook more at home — restaurant food is often high in unhealthy fats",
                  "Keep healthy snacks visible and accessible",
                  "Drink water instead of sugary beverages",
                  "Plan meals ahead to avoid last-minute unhealthy choices"
                ].map((tip, i) => (
                  <li key={i}><span className="tip-num">{i + 1}</span>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hh-footer">
          <div className="hh-footer-left">Colorado Springs Health Collective<br /><span>(719) 824-4716 · dpc@coshealthcollective.com · coshealthcollective.com</span></div>
          <div className="hh-footer-disclaimer">This guide is for educational purposes only and is not a substitute for personalized medical advice.<br />Discuss any dietary changes with your healthcare provider.</div>
        </div>
      </div>
    </div>
  );
}
