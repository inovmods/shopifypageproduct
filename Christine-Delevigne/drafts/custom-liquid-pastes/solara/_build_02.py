# Build 02-achat-bogo.liquid from snippets/kualley-kp-complete-block.liquid
from pathlib import Path
import re

src = Path(r"c:\assets\blueprint\snippets\kualley-kp-complete-block.liquid").read_text(encoding="utf-8")
root = Path(__file__).resolve().parent

paste_intro = """{% comment %}
  Kualley Solara — achat BOGO + sticky + bottom sheet + guide tailles (même logique que kualley-kp-complete-block).
  Un seul `data-kp-root` par page. Coller après 01-galerie-bogo.
  ATC : redirection `/cart/id:qty,id2:qty` (comme le snippet actuel du thème).
  Option : `kp_paste_handle` si hors page produit. `kp_fallback_profile` : `solara` | `marea`
{% endcomment %}
{% assign kp_paste_handle = 'kualley-solara-set' %}
{% assign kp_fallback_profile = kp_fallback_profile | default: '' %}
{% assign kp_solara_static_handle = kp_solara_static_handle | default: 'kualley-solara-set' %}
{% assign kp_marea_static_handle = kp_marea_static_handle | default: 'kualley-marea-set' %}
{% assign kp_prefer_static_variants = kp_prefer_static_variants | default: false %}
{% assign p = product %}
{% if p == blank and closest.product != blank %}
  {% assign p = closest.product %}
{% endif %}
{% if p == blank and kp_paste_handle != blank %}
  {% assign p = all_products[kp_paste_handle] %}
{% endif %}
{% if p == blank %}
  {% assign p = collections.all.products.first %}
{% endif %}

"""

idx = src.find("{% if p == blank %}")
if idx < 0:
    raise SystemExit("{% if p == blank %} not found")
out = paste_intro + src[idx:]

fallback = """{% if p != blank %}
{% assign _kpf_prof = kp_fallback_profile | default: '' | strip | downcase %}
{% assign _kpf_h = p.handle %}
{% assign _kpf_sol = kp_solara_static_handle | default: 'kualley-solara-set' %}
{% assign _kpf_mar = kp_marea_static_handle | default: 'kualley-marea-set' %}
{% if _kpf_prof == 'solara' or _kpf_h == _kpf_sol %}
<script type="application/json" data-k-variant-fallback>
[{"id":53475051700561,"title":"XS / Style 1","options":["XS","Style 1"],"available":true},{"id":53475051733329,"title":"XS / Style 2","options":["XS","Style 2"],"available":true},{"id":53475051798865,"title":"XS / Style 3","options":["XS","Style 3"],"available":true},{"id":53475051176273,"title":"S / Style 1","options":["S","Style 1"],"available":true},{"id":53475051209041,"title":"S / Style 2","options":["S","Style 2"],"available":true},{"id":53475051274577,"title":"S / Style 3","options":["S","Style 3"],"available":true},{"id":53475051569489,"title":"M / Style 1","options":["M","Style 1"],"available":true},{"id":53475051602257,"title":"M / Style 2","options":["M","Style 2"],"available":true},{"id":53475051667793,"title":"M / Style 3","options":["M","Style 3"],"available":true},{"id":53475051438417,"title":"L / Style 1","options":["L","Style 1"],"available":true},{"id":53475051471185,"title":"L / Style 2","options":["L","Style 2"],"available":true},{"id":53475051536721,"title":"L / Style 3","options":["L","Style 3"],"available":true},{"id":53475051307345,"title":"XL / Style 1","options":["XL","Style 1"],"available":true},{"id":53475051340113,"title":"XL / Style 2","options":["XL","Style 2"],"available":true},{"id":53475051405649,"title":"XL / Style 3","options":["XL","Style 3"],"available":true}]
</script>
{% elsif _kpf_prof == 'marea' or _kpf_h == _kpf_mar %}
<script type="application/json" data-k-variant-fallback>
[{"id":53407000592721,"title":"S / Style 1","options":["S","Style 1"],"available":true},{"id":53407000625489,"title":"S / Style 2","options":["S","Style 2"],"available":true},{"id":53407000658257,"title":"S / Style 3","options":["S","Style 3"],"available":true},{"id":53407000789329,"title":"M / Style 1","options":["M","Style 1"],"available":true},{"id":53407000822097,"title":"M / Style 2","options":["M","Style 2"],"available":true},{"id":53407000854865,"title":"M / Style 3","options":["M","Style 3"],"available":true},{"id":53407000691025,"title":"L / Style 1","options":["L","Style 1"],"available":true},{"id":53407000723793,"title":"L / Style 2","options":["L","Style 2"],"available":true},{"id":53407000756561,"title":"L / Style 3","options":["L","Style 3"],"available":true}]
</script>
{% endif %}
{% endif %}
"""

out = out.replace(
    "{% render 'kualley-kp-variant-fallback', kp_product: p, kp_fallback_profile: kp_fallback_profile %}",
    fallback,
    1,
)

out = re.sub(
    r"<div class=\"k-grid\">\s*<div class=\"k-gal\">.*?</div>\s*\n\s*<div class=\"k-info\"",
    '<div class="k-info"',
    out,
    count=1,
    flags=re.DOTALL,
)

out = out.replace(
    "</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"k-social\">",
    "</div>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"k-social\">",
    1,
)

out = re.sub(
    r"\n  <section class=\"k-social\">.*?</section>\s*\n  <section class=\"k-sec\">.*?</section>\s*",
    "\n  ",
    out,
    count=1,
    flags=re.DOTALL,
)

# Empty-state copy (optional clarity for Custom Liquid)
out = out.replace(
    "ou passez <code>kp_home_handle</code> / <code>kp_product</code> au render.",
    "ou définissez <code>kp_paste_handle</code> en haut du bloc.",
    1,
)

out_path = root / "02-achat-bogo.liquid"
out_path.write_text(out, encoding="utf-8")
print("Wrote", out_path.name, len(out), "chars")
