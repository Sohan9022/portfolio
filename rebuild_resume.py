import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import parse_xml
import os
import win32com.client
import pypdf
import pymupdf

def build_top_tier_resume():
    """
    Builds a strictly 1-page Associate Product Manager (APM) resume
    tailored for top tech companies (Google, Meta, Uber, Stripe, etc.):
    - True, crisp black text (#000000) for maximum contrast and legibility.
    - Single-line contact header with embedded logos for Phone, Mail, Portfolio, LinkedIn, and GitHub.
    - APM Profile Summary without CGPA (CGPA kept under Education).
    - Education: '2023 – 2027', 'CGPA: 8.97 / 10.0 (Pursuing)'.
    - Work Experience & Projects: Removed years from both projects.
    - Honors & Awards: 'National Finalist at India Innovates Hackathon' (removed 'Won').
    - HCI Research Study: Submitted to JASE for Peer Review.
    - Drive Certificate links embedded in Certifications and Honors/Awards.
    - Strictly 1 page, verified via Word COM and PyPDF.
    """
    doc = docx.Document()
    
    # 0.35 in vertical margins, 0.44 in horizontal margins
    for section in doc.sections:
        section.top_margin = Inches(0.35)
        section.bottom_margin = Inches(0.35)
        section.left_margin = Inches(0.44)
        section.right_margin = Inches(0.44)
        
    COLOR_BLACK = RGBColor(0, 0, 0)
    COLOR_LINK = "1D4ED8" # Deep Royal Blue
    
    def add_p(space_before=0, space_after=1.2, line_spacing=1.05):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_bullet_p(space_before=0, space_after=1.2, line_spacing=1.05):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.16)
        p.paragraph_format.first_line_indent = Inches(-0.16)
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_heading(title):
        p = add_p(space_before=5.2, space_after=2.0)
        run = p.add_run(title)
        run.font.name = 'Calibri'
        run.font.size = Pt(9.6)
        run.font.bold = True
        run.font.color.rgb = COLOR_BLACK
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="2" w:color="94A3B8"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_hyperlink(paragraph, url, text, color_hex=COLOR_LINK, underline=False, font_size_pt=8.8, bold=False):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        u_tag = '<w:u w:val="single"/>' if underline else ''
        b_tag = '<w:b/>' if bold else ''
        sz_val = int(font_size_pt * 2)
        xml_str = f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:sz w:val="{sz_val}"/>
                    <w:color w:val="{color_hex}"/>
                    {u_tag}
                    {b_tag}
                </w:rPr>
                <w:t xml:space="preserve">{text}</w:t>
            </w:r>
        </w:hyperlink>'''
        paragraph._p.append(parse_xml(xml_str))

    def add_logo_hyperlink(paragraph, url, icon_path, label_text, color_hex=COLOR_LINK, font_size_pt=8.4):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        
        temp_run = paragraph.add_run()
        temp_run.add_picture(icon_path, width=Pt(8.5), height=Pt(8.5))
        drawing = temp_run._r.xpath('w:drawing')[0]
        temp_run._r.remove(drawing)
        paragraph._p.remove(temp_run._r)
        
        sz_val = int(font_size_pt * 2)
        hl = parse_xml(f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:sz w:val="{sz_val}"/>
                </w:rPr>
            </w:r>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
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
    # 1. HEADER (One-Line Contact with Embedded Logos)
    # ==========================
    p_name = add_p(space_before=0, space_after=1.5)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('SOHAN GADEWAR')
    r_name.font.name = 'Calibri'; r_name.font.size = Pt(17.5); r_name.font.bold = True
    r_name.font.color.rgb = COLOR_BLACK

    # Single-line contact row
    p_contact = add_p(space_before=0, space_after=3.2)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    # Phone with embedded tel: link
    add_logo_hyperlink(p_contact, 'tel:+919022778561', 'public/icons/resume/phone.png', '+91 9022778561', color_hex="000000", font_size_pt=8.4)
    
    r_sep1 = p_contact.add_run('   •   ')
    r_sep1.font.name = 'Calibri'; r_sep1.font.size = Pt(8.4); r_sep1.font.color.rgb = RGBColor(148, 163, 184)
    
    # Mail with embedded mailto: link
    add_logo_hyperlink(p_contact, 'mailto:sohangadewar9022@gmail.com', 'public/icons/resume/gmail.png', 'sohangadewar9022@gmail.com', color_hex="1D4ED8", font_size_pt=8.4)
    
    r_sep2 = p_contact.add_run('   •   ')
    r_sep2.font.name = 'Calibri'; r_sep2.font.size = Pt(8.4); r_sep2.font.color.rgb = RGBColor(148, 163, 184)
    
    # Portfolio with embedded link
    add_logo_hyperlink(p_contact, 'https://vercel.com/sun-6b0b/portfolio', 'public/icons/resume/globe.png', 'Portfolio', color_hex="1D4ED8", font_size_pt=8.4)
    
    r_sep3 = p_contact.add_run('   •   ')
    r_sep3.font.name = 'Calibri'; r_sep3.font.size = Pt(8.4); r_sep3.font.color.rgb = RGBColor(148, 163, 184)
    
    # LinkedIn with embedded link
    add_logo_hyperlink(p_contact, 'https://www.linkedin.com/in/sohan-gadewar-9644a530b/?isSelfProfile=true', 'public/icons/resume/linkedin.png', 'LinkedIn', color_hex="1D4ED8", font_size_pt=8.4)
    
    r_sep4 = p_contact.add_run('   •   ')
    r_sep4.font.name = 'Calibri'; r_sep4.font.size = Pt(8.4); r_sep4.font.color.rgb = RGBColor(148, 163, 184)
    
    # GitHub with embedded link
    add_logo_hyperlink(p_contact, 'https://github.com/Sohan9022', 'public/icons/resume/github.png', 'GitHub', color_hex="1D4ED8", font_size_pt=8.4)

    # ==========================
    # 2. PROFILE SUMMARY (No CGPA, purely APM focus)
    # ==========================
    add_heading('PROFILE SUMMARY')
    p_sum = add_p(space_before=0.5, space_after=2.2)
    r = p_sum.add_run('Technical product builder combining strong software engineering foundations with user-centric 0-to-1 execution. Proven track record of conducting user research, framing product theses, and scoping comprehensive PRDs for AI-driven systems. Skilled at balancing technical feasibility with intuitive design to build deterministic architectures that eliminate workflow friction and earn user trust.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.color.rgb = COLOR_BLACK

    # ==========================
    # 3. EDUCATION ('Pursuing' added after CGPA)
    # ==========================
    add_heading('EDUCATION')
    p_edu1 = add_p(space_before=0.5, space_after=0.4)
    p_edu1.paragraph_format.tab_stops.add_tab_stop(Inches(7.62), WD_TAB_ALIGNMENT.RIGHT)
    r = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
    r.font.name = 'Calibri'; r.font.size = Pt(9.2); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p_edu1.add_run('\t2023 – 2027')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True; r.font.color.rgb = COLOR_BLACK

    p_edu_deg = add_p(space_before=0, space_after=0.4)
    r = p_edu_deg.add_run('Bachelor of Technology in Information Technology  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.color.rgb = COLOR_BLACK
    r = p_edu_deg.add_run('CGPA: 8.97 / 10.0 (Pursuing)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True; r.font.color.rgb = COLOR_BLACK

    p_edu2 = add_p(space_before=0, space_after=2.0)
    r = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems, Computer Networks, System Design, Object-Oriented Programming (OOP)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = COLOR_BLACK

    # ============================================
    # 4. WORK EXPERIENCE & PROJECTS (No years)
    # ============================================
    add_heading('WORK EXPERIENCE & PROJECTS')

    # Flagship 1: Project Sentinel (No years)
    p_p1_title = add_p(space_before=1.4, space_after=0.3)
    r = p_p1_title.add_run('Project Sentinel — AI Decision Memory & State-Drift Agent')
    r.font.name = 'Calibri'; r.font.size = Pt(9.3); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p_p1_title.add_run('  |  Enterprise AI Product')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.color.rgb = COLOR_BLACK

    p_link1 = add_p(space_before=0, space_after=0.6)
    r = p_link1.add_run('Interactive Prototype: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    add_hyperlink(p_link1, 'https://echo-sentinel-08.lovable.app', 'echo-sentinel-08.lovable.app', underline=True, font_size_pt=8.6, bold=False)
    r = p_link1.add_run('   |   PRD Specification: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    add_hyperlink(p_link1, 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', 'Notion PRD', underline=True, font_size_pt=8.6, bold=False)

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Spearheaded product discovery across engineering standups, Slack, and Jira, identifying critical context loss and finding that unprompted bot summaries cause heavy distraction by interrupting developer focus.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Formulated the ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('"Silent-by-Default"')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(' product thesis, passively ingesting audio transcripts and commit streams without channel spam while deliberately scoping out employee surveillance features in V1.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Architected deterministic audit engine powered by ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('append-only PostgreSQL schemas')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(', surfacing discrepancies between spoken commitments and recorded codebase state strictly upon explicit user queries.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=2.0)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Shipped interactive clickable MVP on Lovable with live drift queries; authored comprehensive ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('Notion PRD')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(' detailing state transition matrices, query grammar, and phased enterprise rollout.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    # Flagship 2: FinMate AI (No years)
    p_p2_title = add_p(space_before=1.4, space_after=0.3)
    r = p_p2_title.add_run('FinMate AI — Conversational Expense Memory & Deterministic Accounting')
    r.font.name = 'Calibri'; r.font.size = Pt(9.3); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p_p2_title.add_run('  |  FinTech Systems')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.color.rgb = COLOR_BLACK

    p_link2 = add_p(space_before=0, space_after=0.6)
    r = p_link2.add_run('Live Production MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    add_hyperlink(p_link2, 'https://tell-finmate-ai.lovable.app', 'tell-finmate-ai.lovable.app', underline=True, font_size_pt=8.6, bold=False)
    r = p_link2.add_run('   |   Architecture & PRD: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.6); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    add_hyperlink(p_link2, 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link', 'Notion PRD', underline=True, font_size_pt=8.6, bold=False)

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Uncovered key user friction in expense tracking where tedious manual multi-field forms trigger severe drop-off, while identifying that pure LLM bots hallucinate arithmetic totals, destroying financial trust.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Engineered ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('two-stage decoupled architecture')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(' directing multimodal LLMs (voice notes, OCR receipts, chat) to extract structured JSON intents and entities, while routing all arithmetic calculations to concurrency-safe PostgreSQL stored procedures (RPCs).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Enforced complete financial auditability through ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('evidence-linked ledger rows')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(', guaranteeing clickable citations for every balance response and preventing arithmetic discrepancies.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=2.0)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Deployed production-ready MVP on Lovable with ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b = p.add_run('streaming voice transcription')
    r_b.font.name = 'Calibri'; r_b.font.size = Pt(8.7); r_b.font.bold = True; r_b.font.color.rgb = COLOR_BLACK
    r = p.add_run(' and informal loan tracking; authored complete PRD covering database schemas, Row-Level Security (RLS) policies, and error handling.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    # ==========================
    # 5. PATENTS & RESEARCH
    # ==========================
    add_heading('PATENTS & RESEARCH')
    p = add_bullet_p(space_before=0.8, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Filed Patent (South African Patent Office): ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('AI-Powered Lost & Found Matching System — Conceptualized 5-factor blind multimodal scoring architecture (image embeddings, NLP text, geolocation, timestamp) with automated urgency detection | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=2.0)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('HCI Research Study (Submitted to JASE for Peer Review): ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('AI-Driven Multilingual Adaptive UX Framework & Zero-Risk Financial Sandbox — Designed dual-mode environment pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture affordances | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    # ==========================
    # 6. HONORS & AWARDS (Removed 'Won')
    # ==========================
    add_heading('HONORS & AWARDS')
    p = add_bullet_p(space_before=0.8, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('National Finalist at India Innovates Hackathon: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Ranked among ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b1 = p.add_run('top 20% finalist teams')
    r_b1.font.name = 'Calibri'; r_b1.font.size = Pt(8.7); r_b1.font.bold = True; r_b1.font.color.rgb = COLOR_BLACK
    r = p.add_run(' nationwide out of ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    r_b2 = p.add_run('6,000+ participating teams')
    r_b2.font.name = 'Calibri'; r_b2.font.size = Pt(8.7); r_b2.font.bold = True; r_b2.font.color.rgb = COLOR_BLACK
    r = p.add_run(' across India | 2026')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=2.0)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Qualified for Round 2 in GHCI 25 National GenAI Hackathon: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run("AnitaB.org India & Backbase | 'Unbound with GenAI: Breaking Barriers, Creating Impact' | ")
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    add_hyperlink(p, 'https://drive.google.com/file/d/1EYQfURC7-HouESGvdT4P16jiaZ79m6RE/view?usp=drive_link', 'Certificate', underline=True, font_size_pt=8.7, bold=True)
    r = p.add_run(' | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    # ==========================
    # 7. SKILLS
    # ==========================
    add_heading('SKILLS')
    p = add_bullet_p(space_before=0.8, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Product Management: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Product Discovery, Product Requirements Document (PRD), Jobs-to-be-Done (JTBD), User Journey Mapping, RICE Prioritization, North Star & Guardrail Metrics, Customer Interviews, Experimentation, Go-to-Market (GTM) Strategy, Trade-off Analysis, Figma')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('AI & Systems: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('LLM Prompt Engineering, Retrieval-Augmented Generation (RAG), AI Governance, Vector Embeddings, Multimodal AI (Voice, Vision OCR), PostgreSQL Stored Procedures (RPC), REST APIs, High-Level Design (HLD)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=0.6)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Technical & Problem-Solving: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('Java, Spring Framework, Python, SQL/PostgreSQL, REST APIs, Git, LangChain, LangGraph, Rapid Prototyping (Lovable.dev)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    p = add_bullet_p(space_before=0, space_after=2.0)
    r = p.add_run('• ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('DSA & Competitive Programming: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.bold = True; r.font.color.rgb = COLOR_BLACK
    r = p.add_run('610+ Solved Problems — 400+ LeetCode, 210+ GeeksforGeeks (Data Structures, Algorithms, Problem Solving)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK

    # ==========================
    # 8. CERTIFICATIONS (With User-Provided Drive Links)
    # ==========================
    add_heading('CERTIFICATIONS')
    p_cert = add_p(space_before=0.8, space_after=0)
    
    # 1. Product Management Masterclass (GeeksforGeeks)
    add_hyperlink(p_cert, 'https://drive.google.com/file/d/199XpTr2wp9waMzs4I5PiToiuOoKuQvJK/view?usp=drive_link', 'Product Management Masterclass (GeeksforGeeks)', underline=True, font_size_pt=8.7, bold=False)
    
    r = p_cert.add_run('   |   ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    
    # 2. n8n (CampusX)
    add_hyperlink(p_cert, 'https://drive.google.com/file/d/1phqwetDgCSHg1ykofHUi9J4a7JWGJ74Y/view?usp=drive_link', 'n8n Workflow Automation (CampusX)', underline=True, font_size_pt=8.7, bold=False)
    
    r = p_cert.add_run('   |   ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    
    # 3. Advanced RAG (CampusX)
    r = p_cert.add_run('Advanced RAG (CampusX)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    
    r = p_cert.add_run('   |   ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    
    # 4. Prompt Engineering
    add_hyperlink(p_cert, 'https://drive.google.com/file/d/1NqDNLf16tuThGlGOO2cFp1IxiTjWQCFP/view?usp=drive_link', 'Prompt Engineering', underline=True, font_size_pt=8.7, bold=False)
    
    r = p_cert.add_run('   |   ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.7); r.font.color.rgb = COLOR_BLACK
    
    # 5. Docker for ML (CampusX)
    add_hyperlink(p_cert, 'https://drive.google.com/file/d/16eh0ob2JVliyVaThmYrngZXz-AVuKIV0/view?usp=drive_link', 'Docker for ML (CampusX)', underline=True, font_size_pt=8.7, bold=False)

    # Destination paths
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

    # Verify pages with PyMuPDF & PyPDF
    reader = pypdf.PdfReader(dest_pdf_1)
    pdf_pages = len(reader.pages)
    annots = reader.pages[0].get('/Annots')
    annot_count = len(annots) if annots else 0

    print(f"Top Tier APM Resume Complete!")
    print(f"Word computed pages: {pages}")
    print(f"PyPDF verified pages: {pdf_pages}")
    print(f"Verified link annotations: {annot_count}")
    
    # Render preview image
    pdf = pymupdf.open(dest_pdf_1)
    pix = pdf[0].get_pixmap(dpi=150)
    pix.save('scratch_apm_v4.png')
    print("Saved rendered scratch_apm_v4.png")

if __name__ == '__main__':
    build_top_tier_resume()
