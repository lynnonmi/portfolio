import re
root='/home/user/portfolio/'
css=open(root+'css/styles.css').read()
data=open(root+'js/data.js').read().replace('export const','const').replace("href: 'photography.html'","href: '?page=photography'").replace('const categories =','const allCategories =').replace('const featured =','const featuredSlugs =').replace('featured.includes(p.slug)','featuredSlugs.includes(p.slug)')
app=open(root+'js/app.js').read()
app=re.sub(r"^import .*\n",'',app,count=1)
app=app.replace("document.body.dataset.page","(new URLSearchParams(location.search).get('page') || 'home')")
for a,b in [('project.html?slug=','?page=project&slug='),('index.html','?page=home'),('work.html','?page=work'),('photography.html','?page=photography'),('about.html','?page=about'),('contact.html','?page=contact')]:
    app=app.replace(a,b)
app=app.replace("new URLSearchParams(location.search).get('slug')","new URLSearchParams(location.search).get('slug')")
html=f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lynn Kim, portfolio archive</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap">
<style>
{css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div id="root"></div>
<script>
{data}
{app}
</script>
</body>
</html>
"""
open(root+'share/portfolio-single.html','w').write(html)
print(len(html))
