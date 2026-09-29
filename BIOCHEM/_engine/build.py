import re,base64,os,sys,glob,io
from PIL import Image
B=os.path.dirname(os.path.abspath(__file__))
W=os.path.join(os.path.dirname(B),'w')
order=['c0.js','c111.js','c112.js','c12.js','c13.js','c141.js','c142.js','c15.js','c16.js','cR.js','cX.js']
content=''
for f in order:
    p=os.path.join(B,f)
    if os.path.exists(p): content+='\n/* ==== '+f+' ==== */\n'+open(p).read()
ids=sorted(set(re.findall(r"FIG\('([^']+)'",content)))
imgs={}
tot=0
import json,pymupdf
IJ=json.load(open(os.path.join(W,'imgs.json')))
def pdfpath(tag):
    for f in glob.glob('/root/.claude/uploads/*/*BCM*.pdf'):
        if os.path.basename(f)[9:].split('_')[1]==tag: return f
def union_crop(i):
    m=re.match(r'^(.+?)_p(\d\d)_(\d\d)((?:\+\d\d)+)$',i)
    tag,pg,first=m.group(1),int(m.group(2)),int(m.group(3)); rest=[int(x) for x in m.group(4).split('+') if x]
    idxs=[first]+rest
    # rebuild filtered order
    n=0;boxes={}
    for (p,x0,y0,w,h,xref) in IJ[tag]:
        if w<110 or h<60: continue
        boxes[(p,n)]=(x0,y0,x0+w,y0+h);n+=1
    # index numbering is global per tag (as in crops), so look up by that number
    bs=[boxes[(pg,k)] for k in idxs if (pg,k) in boxes]
    x0=min(b[0] for b in bs);y0=min(b[1] for b in bs);x1=max(b[2] for b in bs);y1=max(b[3] for b in bs)
    d=pymupdf.open(pdfpath(tag)); pgobj=d[pg-1]
    pm=pgobj.get_pixmap(clip=pymupdf.Rect(x0,y0,x1,y1)&pgobj.rect,dpi=130)
    return Image.open(io.BytesIO(pm.tobytes('png'))).convert('RGB')
for i in ids:
    if '+' in i:
        im=union_crop(i)
        if im.width>1000: im=im.resize((1000,int(im.height*1000/im.width)))
        bio=io.BytesIO(); im.save(bio,'JPEG',quality=70,optimize=True)
        b=base64.b64encode(bio.getvalue()).decode(); imgs[i]='data:image/jpeg;base64,'+b; tot+=len(b); continue
    p=os.path.join(W,'fig',i+'.jpg')
    if not os.path.exists(p):
        p2=os.path.join(B,'figs',i+'.jpg')
        if os.path.exists(p2): p=p2
        else: print('MISSING',i); continue
    im=Image.open(p).convert('RGB')
    if im.width>1000: im=im.resize((1000,int(im.height*1000/im.width)))
    bio=io.BytesIO(); im.save(bio,'JPEG',quality=70,optimize=True)
    b=base64.b64encode(bio.getvalue()).decode()
    imgs[i]='data:image/jpeg;base64,'+b; tot+=len(b)
imgjs='window.IMG='+'{'+','.join('"%s":"%s"'%(k,v) for k,v in imgs.items())+'};'
t=open(os.path.join(B,'template.html')).read()
t=t.replace('/*IMAGES*/',imgjs).replace('/*CORE*/',open(os.path.join(B,'core.js')).read()).replace('/*CONTENT*/',content).replace('/*BOOT*/','boot();')
out=sys.argv[1] if len(sys.argv)>1 else os.path.join(B,'out.html')
open(out,'w').write(t)
print('figs',len(imgs),'img MB %.2f'%(tot/1e6),'html MB %.2f'%(len(t)/1e6))
