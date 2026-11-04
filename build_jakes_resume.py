import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import parse_xml
import os
import win32com.client
import pypdf
import pymupdf

def build_jakes_resume():
    """
    Builds a strictly 1-page resume matching the classic 'Jake's Resume' (LaTeX/Overleaf)
    serif formatting seen in top Ivy League & Silicon Valley / Google APM applications:
    - Font: Times New Roman serif across all sections.
    - Centered Name & Location with crisp margins.
    - Centered Contact bar with monochrome black icons & clickable links.
    - Section Headings in Title Case with a razor-thin, tight horizontal rule beneath.
    - Numbered Projects (1, 2, 3) with generous vertical breathing room.
    - Two-line project headers: Line 1 = Title & Date; Line 2 = Tech Stack, Live Links & Domain.
    - Crisp, properly indented bullet lists: subtle non-bold bullet symbol (•), indented from margin,
      with tab-aligned hanging indent where line 1 text and wrapped line 2 text align perfectly.
    - 3 punchy, high-impact bullets per project with bold metrics.
    - Clean Experience & Leadership entries (India Innovates, GHCI 25 Hackathon with certificate link, Patent Filed).
    - Authentic FlashDrop architecture (Java, Spring Boot, MySQL, HikariCP, zero Redis/Docker).
    - No LeetCode under Product & Tools (LeetCode is properly positioned in the header).
    - Verified strictly 1 page via Word COM and PyPDF.
    """
    doc = docx.Document()
    
    # 0.38 in vertical margins, 0.48 in horizontal margins
    for section in doc.sections:
        section.top_margin = Inches(0.38)
        section.bottom_margin = Inches(0.38)
        section.left_margin = Inches(0.48)
        section.right_margin = Inches(0.48)
        
    COLOR_BLACK = RGBColor(0, 0, 0)
    COLOR_LINK = "1D4ED8" # Deep Royal Blue for visible, professional clickable links
    FONT_FAMILY = "Times New Roman"
    
    # Page width = 8.5", margins = 0.48" each -> content width = 7.54"
    RIGHT_TAB = Inches(7.54)

    def add_p(space_before=0, space_after=1.0, line_spacing=1.05):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_bullet_p(space_before=0, space_after=1.2, line_spacing=1.05):
        """
        Creates a LaTeX-standard bullet list item:
        - Bullet symbol indented slightly from margin (0.06 in = 4.3 pt)
        - Text begins at hanging indent tab stop (0.18 in = 13.0 pt)
        - Wrapped lines start at the exact same tab stop (0.18 in)
        - Perfectly aligned vertical column with no stair-stepping
        """
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.18)
        p.paragraph_format.first_line_indent = Inches(-0.12)
        p.paragraph_format.tab_stops.add_tab_stop(Inches(0.18))
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        
        r_b = p.add_run('•\t')
        r_b.font.name = FONT_FAMILY
        r_b.font.size = Pt(7.5)
        r_b.font.bold = False
        r_b.font.color.rgb = COLOR_BLACK
        return p

    def add_heading(title):
        # space_after is small so the horizontal rule is tightly drawn right beneath the text (LaTeX style)
        p = add_p(space_before=5.0, space_after=0.6)
        run = p.add_run(title)
        run.font.name = FONT_FAMILY
        run.font.size = Pt(10.8)
        run.font.bold = True
        run.font.color.rgb = COLOR_BLACK
        
        # Crisp full-width black line beneath the heading (LaTeX \hrule style)
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="1" w:color="000000"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_hyperlink(paragraph, url, text, color_hex=COLOR_LINK, underline=True, font_size_pt=8.8, bold=False, italic=False):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        u_tag = '<w:u w:val="single"/>' if underline else ''
        b_tag = '<w:b/>' if bold else ''
        i_tag = '<w:i/>' if italic else ''
        sz_val = int(font_size_pt * 2)
        safe_text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        xml_str = f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="{FONT_FAMILY}" w:hAnsi="{FONT_FAMILY}"/>
                    <w:sz w:val="{sz_val}"/>
                    <w:color w:val="{color_hex}"/>
                    {u_tag}
                    {b_tag}
                    {i_tag}
                </w:rPr>
                <w:t xml:space="preserve">{safe_text}</w:t>
            </w:r>
        </w:hyperlink>'''
        paragraph._p.append(parse_xml(xml_str))

    def add_logo_hyperlink(paragraph, url, icon_path, label_text, color_hex="000000", font_size_pt=8.8):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        
        temp_run = paragraph.add_run()
        temp_run.add_picture(icon_path, width=Pt(8.0), height=Pt(8.0))
        drawing = temp_run._r.xpath('w:drawing')[0]
        temp_run._r.remove(drawing)
        paragraph._p.remove(temp_run._r)
        
        sz_val = int(font_size_pt * 2)
        hl = parse_xml(f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="{FONT_FAMILY}" w:hAnsi="{FONT_FAMILY}"/>
                    <w:sz w:val="{sz_val}"/>
                </w:rPr>
            </w:r>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="{FONT_FAMILY}" w:hAnsi="{FONT_FAMILY}"/>
                    <w:sz w:val="{sz_val}"/>
                    <w:color w:val="{color_hex}"/>
                </w:rPr>
                <w:t xml:space="preserve"> {label_text}</w:t>
            </w:r>
        </w:hyperlink>''')
        r_img = hl.xpath('w:r')[0]
        r_img.append(drawing)
        paragraph._p.append(hl)

    # ==========================
    # 1. HEADER (Centered LaTeX Style)
    # ==========================
    p_name = add_p(space_before=0, space_after=1.0)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('SOHAN GADEWAR')
    r_name.font.name = FONT_FAMILY; r_name.font.size = Pt(20.5); r_name.font.bold = True
    r_name.font.color.rgb = COLOR_BLACK

    p_loc = add_p(space_before=0, space_after=1.8)
    p_loc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_loc = p_loc.add_run('Pune, Maharashtra, India')
    r_loc.font.name = FONT_FAMILY; r_loc.font.size = Pt(9.2)
    r_loc.font.color.rgb = COLOR_BLACK

    # Centered Contact Row with Monochrome Icons & Clickable Links
    p_contact = add_p(space_before=0, space_after=2.5)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    add_logo_hyperlink(p_contact, 'tel:+919022778561', 'public/icons/resume_black/phone.png', '+91 9022778561', color_hex="000000", font_size_pt=8.8)
    p_contact.add_run('   ')
    
    add_logo_hyperlink(p_contact, 'mailto:sohangadewar9022@gmail.com', 'public/icons/resume_black/gmail.png', 'sohangadewar9022@gmail.com', color_hex="000000", font_size_pt=8.8)
    p_contact.add_run('   ')
    
    add_logo_hyperlink(p_contact, 'https://www.linkedin.com/in/sohan-gadewar-9644a530b/?isSelfProfile=true', 'public/icons/resume_black/linkedin.png', 'LinkedIn', color_hex="000000", font_size_pt=8.8)
    p_contact.add_run('   ')
    
    add_logo_hyperlink(p_contact, 'https://github.com/Sohan9022', 'public/icons/resume_black/github.png', 'Github', color_hex="000000", font_size_pt=8.8)
    p_contact.add_run('   ')
    
    add_logo_hyperlink(p_contact, 'https://portfolio-ruby-mu-r5o6ica105.vercel.app/', 'public/icons/resume_black/globe.png', 'Portfolio', color_hex="000000", font_size_pt=8.8)
    p_contact.add_run('   ')
    
    r_lc = p_contact.add_run('</> ')
    r_lc.font.name = FONT_FAMILY; r_lc.font.size = Pt(8.2); r_lc.font.bold = True
    add_hyperlink(p_contact, 'https://leetcode.com/u/sohangadewar9022/', 'LeetCode', color_hex="000000", underline=False, font_size_pt=8.8)

    # ==========================
    # 2. EDUCATION
    # ==========================
    add_heading('Education')
    
    p_edu = add_p(space_before=1.8, space_after=0.4)
    p_edu.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_edu.add_run('Vishwakarma Institute of Information Technology')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_edu.add_run('\t2023 – 2027')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True
    
    p_edu_sub = add_p(space_before=0, space_after=0.8)
    p_edu_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_edu_sub.add_run('B.Tech in Information Technology | ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.italic = True
    r_cgpa = p_edu_sub.add_run('CGPA: 8.97/10.00')
    r_cgpa.font.name = FONT_FAMILY; r_cgpa.font.size = Pt(9.2); r_cgpa.font.bold = True; r_cgpa.font.italic = True
    r = p_edu_sub.add_run('\tPune, India')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.italic = True
    
    p_course = add_p(space_before=0, space_after=2.4)
    r = p_course.add_run('Relevant Coursework: ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6); r.font.bold = True
    r = p_course.add_run('Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, System Design, Object Oriented Programming, Machine Learning.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # ==========================
    # 3. EXPERIENCE & LEADERSHIP (Distinct Entries)
    # ==========================
    add_heading('Experience & Leadership')
    
    # Entry 1: India Innovates Hackathon
    p_exp1 = add_p(space_before=1.6, space_after=0.3)
    p_exp1.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp1.add_run('India Innovates Hackathon')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_exp1.add_run('\tJan 2026 – Feb 2026')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True
    
    p_exp1_sub = add_p(space_before=0, space_after=0.8)
    p_exp1_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp1_sub.add_run('National Finalist & Lead Builder — Ministry of Education & AICTE')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True
    r = p_exp1_sub.add_run('\tPune, India')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True
    
    p = add_bullet_p(space_before=0, space_after=1.0)
    r = p.add_run('Ranked among ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('top 20% finalist teams')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' nationwide out of ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('6,000+ participating teams')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' across India; spearheaded product discovery, scoping, and rapid cross-functional sprints.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # Entry 2: GHCI 25 National GenAI Hackathon (Standalone Entry)
    p_exp2 = add_p(space_before=1.6, space_after=0.3)
    p_exp2.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp2.add_run('GHCI 25 National GenAI Hackathon')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_exp2.add_run('\t2025')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True
    
    p_exp2_sub = add_p(space_before=0, space_after=0.8)
    p_exp2_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp2_sub.add_run('Round 2 Qualifier — AnitaB.org India & Backbase ("Unbound with GenAI")  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True
    add_hyperlink(p_exp2_sub, 'https://drive.google.com/file/d/1EYQfURC7-HouESGvdT4P16jiaZ79m6RE/view?usp=drive_link', 'Credential Certificate', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8, italic=True)
    r = p_exp2_sub.add_run('\tNational Hackathon')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True

    p = add_bullet_p(space_before=0, space_after=1.0)
    r = p.add_run('Selected for Round 2 in national GenAI challenge; engineered agent workflows and automated evaluation harnesses with structured JSON guardrails, validating prototype reliability under strict prompt constraints.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # Entry 3: South African Patent Office (Standalone Entry)
    p_exp3 = add_p(space_before=1.6, space_after=0.3)
    p_exp3.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp3.add_run('South African Patent Office (Filed Patent)')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_exp3.add_run('\t2025')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True
    
    p_exp3_sub = add_p(space_before=0, space_after=0.8)
    p_exp3_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_exp3_sub.add_run('Patent Applicant & Inventor — AI-Powered Lost & Found Matching System')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True
    r = p_exp3_sub.add_run('\tStatus: Patent Filed')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.0); r.font.italic = True

    p = add_bullet_p(space_before=0, space_after=2.4)
    r = p.add_run('Conceptualized and filed patent for an AI matching architecture utilizing a ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('5-factor blind multimodal scoring engine')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' (image embeddings, NLP text semantics, spatio-temporal telemetry) with automated urgency detection.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # ==========================
    # 4. PROJECTS (Spacious & Numbered with Unified Two-Line Headers)
    # ==========================
    add_heading('Projects')

    # Project 1: Project Sentinel
    p_proj1 = add_p(space_before=2.0, space_after=0.3)
    p_proj1.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj1.add_run('1. Project Sentinel: AI Decision Memory & State-Drift Agent')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_proj1.add_run('\tAug 2026 – Sept 2026')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True

    p_proj1_sub = add_p(space_before=0, space_after=1.2)
    p_proj1_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj1_sub.add_run('Python, PostgreSQL, FastAPI, Lovable  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True
    add_hyperlink(p_proj1_sub, 'https://echo-sentinel-08.lovable.app', 'Live Prototype', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8)
    r = p_proj1_sub.add_run('  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8)
    add_hyperlink(p_proj1_sub, 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', 'Notion PRD', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8)
    r = p_proj1_sub.add_run('\tEnterprise AI System')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Spearheaded product discovery across engineering standups, Slack, and Jira, identifying critical context loss and formulating the ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('"Silent-by-Default"')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' thesis to eliminate unprompted bot summaries and protect developer attention.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Architected deterministic audit engine powered by ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('append-only PostgreSQL schemas')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(', surfacing discrepancies between spoken commitments and recorded codebase state strictly upon explicit user queries.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=2.8)
    r = p.add_run('Shipped clickable Lovable MVP with live drift queries; authored comprehensive PRD detailing state transition matrices, query grammar, and phased rollout while scoping out employee surveillance features.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # Project 2: CausalRetention
    p_proj2 = add_p(space_before=2.0, space_after=0.3)
    p_proj2.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj2.add_run('2. CausalRetention: Prescriptive Uplift & Customer Retention Engine')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_proj2.add_run('\tOct 2026')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True

    p_proj2_sub = add_p(space_before=0, space_after=1.2)
    p_proj2_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj2_sub.add_run('Python, XGBoost, Streamlit, Docker  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True
    add_hyperlink(p_proj2_sub, 'https://causal-retention.streamlit.app', 'Live Decision Suite', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8)
    r = p_proj2_sub.add_run('  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8)
    add_hyperlink(p_proj2_sub, 'https://github.com/Sohan9022/CausalRetention', 'CATE Spec', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8)
    r = p_proj2_sub.add_run('\tCausal ML Engine')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Uncovered key economic friction in retention marketing where conventional churn models incur a ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('-13.1% net ROI')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' due to deadweight spend on non-responsive "Lost Causes" and churn acceleration from nudging dormant "Sleeping Dogs".')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Architected prescriptive AI decision engine using a ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('Two-Model (T-Learner) XGBoost pipeline')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' to calculate Conditional Average Treatment Effect (CATE), segmenting customer cohorts into 4 distinct quadrants.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=2.8)
    r = p.add_run('Engineered a constrained ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('Knapsack financial budget optimizer')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' under a fixed $15K constraint, capturing ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b2 = p.add_run('+$112.7K+ in net preserved revenue (+752% campaign ROI)')
    r_b2.font.name = FONT_FAMILY; r_b2.font.size = Pt(8.6); r_b2.font.bold = True
    r = p.add_run('; validated incrementality via Qini curves in containerized Streamlit suite.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # Project 3: FlashDrop (Original Spring Boot & MySQL Engine)
    p_proj3 = add_p(space_before=2.0, space_after=0.3)
    p_proj3.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj3.add_run('3. FlashDrop: High-Concurrency Flash Release & ACID Inventory Engine')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.8); r.font.bold = True
    r = p_proj3.add_run('\tOct 2026')
    r.font.name = FONT_FAMILY; r.font.size = Pt(9.2); r.font.bold = True

    p_proj3_sub = add_p(space_before=0, space_after=1.2)
    p_proj3_sub.paragraph_format.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT)
    r = p_proj3_sub.add_run('Java, Spring Boot, MySQL, HikariCP  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True
    add_hyperlink(p_proj3_sub, 'https://github.com/Sohan9022', 'GitHub Repository & Benchmarks', color_hex=COLOR_LINK, underline=True, font_size_pt=8.8)
    r = p_proj3_sub.add_run('\tHigh-Concurrency Backend')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.italic = True

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Architected a high-concurrency flash release inventory engine in Spring Boot backed by MySQL 8.0, eliminating race conditions and guaranteeing ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('zero overselling')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' via InnoDB pessimistic row-level locking (')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_c = p.add_run('SELECT ... FOR UPDATE')
    r_c.font.name = FONT_FAMILY; r_c.font.size = Pt(8.6); r_c.font.bold = True
    r = p.add_run(').')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=1.2)
    r = p.add_run('Designed a ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('3NF relational schema with ACID stored procedures')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' (sp_reserve_product, sp_checkout_order), ensuring atomic multi-table state transitions across limited inventory, buyer holds, and finalized orders.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p = add_bullet_p(space_before=0, space_after=2.8)
    r = p.add_run('Configured optimized ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b = p.add_run('HikariCP connection pooling')
    r_b.font.name = FONT_FAMILY; r_b.font.size = Pt(8.6); r_b.font.bold = True
    r = p.add_run(' and automated native ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r_b2 = p.add_run('MySQL EVENT SCHEDULER')
    r_b2.font.name = FONT_FAMILY; r_b2.font.size = Pt(8.6); r_b2.font.bold = True
    r = p.add_run(' routines to reclaim expired 5-minute temporary holds; verified 0% data inconsistencies via a multi-threaded Python stress suite.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    # ==========================
    # 5. TECHNICAL SKILLS
    # ==========================
    add_heading('Technical Skills')

    def add_skill_line(category, items):
        p = add_p(space_before=0.8, space_after=0.8)
        r = p.add_run(f'{category}: ')
        r.font.name = FONT_FAMILY; r.font.size = Pt(8.8); r.font.bold = True
        r = p.add_run(items)
        r.font.name = FONT_FAMILY; r.font.size = Pt(8.8)
        return p

    add_skill_line('Languages', 'Python, Java, SQL, Golang, C++, C, JavaScript')
    add_skill_line('Frameworks', 'Spring Boot, FastAPI, Streamlit, XGBoost, Scikit-learn, React')
    add_skill_line('Databases & Cloud', 'PostgreSQL, MySQL, Supabase, Docker, Git, Linux')
    add_skill_line('Product & Tools', 'PRD Writing, Jobs-to-be-Done (JTBD), RICE Prioritization, North Star & Counter-Metrics, A/B Testing, Figma, Postman, Notion')

    # ==========================
    # 6. CERTIFICATIONS (With Active Links)
    # ==========================
    add_heading('Certifications')
    
    p_cert = add_bullet_p(space_before=1.0, space_after=0.6)
    r = p_cert.add_run('Product Management: ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6); r.font.bold = True
    add_hyperlink(p_cert, 'https://drive.google.com/file/d/199XpTr2wp9waMzs4I5PiToiuOoKuQvJK/view?usp=drive_link', 'Product Management Masterclass (GeeksforGeeks)', color_hex=COLOR_LINK, underline=True, font_size_pt=8.6, bold=False)
    r = p_cert.add_run(' — Product lifecycle, JTBD discovery frameworks, and roadmap metrics.')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)

    p_cert2 = add_bullet_p(space_before=0, space_after=1.0)
    r = p_cert2.add_run('AI & Workflows: ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6); r.font.bold = True
    add_hyperlink(p_cert2, 'https://drive.google.com/file/d/1NqDNLf16tuThGlGOO2cFp1IxiTjWQCFP/view?usp=drive_link', 'Prompt Engineering', color_hex=COLOR_LINK, underline=True, font_size_pt=8.6, bold=False)
    r = p_cert2.add_run('  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r = p_cert2.add_run('Advanced RAG (CampusX)')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    r = p_cert2.add_run('  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    add_hyperlink(p_cert2, 'https://drive.google.com/file/d/16eh0ob2JVliyVaThmYrngZXz-AVuKIV0/view?usp=drive_link', 'Docker for ML (CampusX)', color_hex=COLOR_LINK, underline=True, font_size_pt=8.6, bold=False)
    r = p_cert2.add_run('  |  ')
    r.font.name = FONT_FAMILY; r.font.size = Pt(8.6)
    add_hyperlink(p_cert2, 'https://drive.google.com/file/d/1phqwetDgCSHg1ykofHUi9J4a7JWGJ74Y/view?usp=drive_link', 'n8n Automation (CampusX)', color_hex=COLOR_LINK, underline=True, font_size_pt=8.6, bold=False)

    # Save documents
    dest_docx_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.docx')
    dest_docx_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.docx')
    dest_docx_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.docx')

    dest_pdf_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.pdf')
    dest_pdf_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.pdf')
    dest_pdf_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.pdf')

    doc.save(dest_docx_1)
    doc.save(dest_docx_2)
    if os.path.exists(os.path.dirname(dest_docx_3)):
        doc.save(dest_docx_3)

    # Convert via Word COM
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    wdoc = word.Documents.Open(dest_docx_1)
    pages = wdoc.ComputeStatistics(2)
    wdoc.SaveAs2(dest_pdf_1, 17)
    wdoc.SaveAs2(dest_pdf_2, 17)
    if os.path.exists(os.path.dirname(dest_pdf_3)):
        wdoc.SaveAs2(dest_pdf_3, 17)
    wdoc.Close(False)
    word.Quit()

    # PyPDF page verification
    reader = pypdf.PdfReader(dest_pdf_1)
    pdf_pages = len(reader.pages)
    annots = reader.pages[0].get('/Annots')
    annot_count = len(annots) if annots else 0

    print(f"Perfection Jake's Resume Complete!")
    print(f"Word computed pages: {pages}")
    print(f"PyPDF verified pages: {pdf_pages}")
    print(f"Verified link annotations: {annot_count}")
    
    # Render preview image
    pdf = pymupdf.open(dest_pdf_1)
    pix = pdf[0].get_pixmap(dpi=150)
    pix.save('scratch_jakes_resume_v5.png')
    print("Saved preview scratch_jakes_resume_v5.png")

if __name__ == '__main__':
    build_jakes_resume()
