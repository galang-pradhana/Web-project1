import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as keystatic_config_default } from "./keystatic.config_BqjxRUY3.mjs";
import { t as calculateDetailedRAB } from "./rab-formula_CNIPtC-K.mjs";
import React from "react";
import { createReader } from "@keystatic/core/reader";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/RABPdfDocument.tsx
var formatPDFRupiah = (value) => {
	return "Rp " + new Intl.NumberFormat("id-ID", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
};
var styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 9,
		fontFamily: "Helvetica",
		color: "#1a1a1a",
		backgroundColor: "#ffffff"
	},
	header: {
		marginBottom: 20,
		borderBottomWidth: 2,
		borderBottomColor: "#000000",
		paddingBottom: 10
	},
	title: {
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
		textTransform: "uppercase",
		letterSpacing: 1,
		marginBottom: 4
	},
	subtitle: {
		fontSize: 10,
		color: "#555555",
		fontFamily: "Helvetica"
	},
	metaSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		padding: 10,
		backgroundColor: "#f5f5f5",
		borderWidth: 1,
		borderColor: "#e5e5e5"
	},
	metaCol: {
		flexDirection: "column",
		width: "48%"
	},
	metaRow: {
		flexDirection: "row",
		marginBottom: 3
	},
	metaLabel: {
		width: 80,
		fontFamily: "Helvetica-Bold",
		color: "#555555"
	},
	metaValue: {
		flex: 1,
		color: "#1a1a1a"
	},
	sectionTitle: {
		fontSize: 11,
		fontFamily: "Helvetica-Bold",
		textTransform: "uppercase",
		marginTop: 15,
		marginBottom: 6,
		borderBottomWidth: 1,
		borderBottomColor: "#1a1a1a",
		paddingBottom: 2
	},
	table: {
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#e5e5e5",
		marginBottom: 15
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#000000",
		color: "#ffffff",
		fontFamily: "Helvetica-Bold",
		padding: 5
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#e5e5e5",
		padding: 5
	},
	tableRowAlternating: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#e5e5e5",
		backgroundColor: "#fafafa",
		padding: 5
	},
	colNo: {
		width: "5%",
		textAlign: "center"
	},
	colCode: {
		width: "12%",
		textAlign: "left"
	},
	colName: {
		width: "38%",
		textAlign: "left"
	},
	colUnit: {
		width: "8%",
		textAlign: "center"
	},
	colVol: {
		width: "10%",
		textAlign: "right"
	},
	colRate: {
		width: "12%",
		textAlign: "right"
	},
	colSub: {
		width: "15%",
		textAlign: "right"
	},
	colBOMName: {
		width: "50%",
		textAlign: "left"
	},
	colBOMUnit: {
		width: "10%",
		textAlign: "center"
	},
	colBOMVol: {
		width: "12%",
		textAlign: "right"
	},
	colBOMRate: {
		width: "13%",
		textAlign: "right"
	},
	colBOMSub: {
		width: "15%",
		textAlign: "right"
	},
	summarySection: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
		marginBottom: 20
	},
	summaryBox: {
		width: 250,
		borderWidth: 1,
		borderColor: "#000000",
		padding: 10,
		backgroundColor: "#fafafa"
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4
	},
	summaryRowBold: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 6,
		paddingTop: 6,
		borderTopWidth: 1,
		borderTopColor: "#000000",
		fontFamily: "Helvetica-Bold"
	},
	disclaimer: {
		marginTop: 30,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#e5e5e5",
		fontSize: 7,
		color: "#888888",
		textAlign: "center",
		lineHeight: 1.3
	}
});
var RABPdfDocument = ({ clientName, projectLocation, projectArea, calculatorResults }) => {
	return /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsxs(Page, {
		size: "A4",
		style: styles.page,
		children: [
			/* @__PURE__ */ jsxs(View, {
				style: styles.header,
				children: [/* @__PURE__ */ jsx(Text, {
					style: styles.title,
					children: "Creativa Studio — Rencana Anggaran Biaya (RAB)"
				}), /* @__PURE__ */ jsx(Text, {
					style: styles.subtitle,
					children: "Dokumen Estimasi Anggaran Pembangunan Konstruksi Standar AHSP SNI"
				})]
			}),
			/* @__PURE__ */ jsxs(View, {
				style: styles.metaSection,
				children: [/* @__PURE__ */ jsxs(View, {
					style: styles.metaCol,
					children: [/* @__PURE__ */ jsxs(View, {
						style: styles.metaRow,
						children: [/* @__PURE__ */ jsx(Text, {
							style: styles.metaLabel,
							children: "Klien:"
						}), /* @__PURE__ */ jsx(Text, {
							style: styles.metaValue,
							children: clientName || "N/A"
						})]
					}), /* @__PURE__ */ jsxs(View, {
						style: styles.metaRow,
						children: [/* @__PURE__ */ jsx(Text, {
							style: styles.metaLabel,
							children: "Lokasi:"
						}), /* @__PURE__ */ jsx(Text, {
							style: styles.metaValue,
							children: projectLocation || "N/A"
						})]
					})]
				}), /* @__PURE__ */ jsxs(View, {
					style: styles.metaCol,
					children: [/* @__PURE__ */ jsxs(View, {
						style: styles.metaRow,
						children: [/* @__PURE__ */ jsx(Text, {
							style: styles.metaLabel,
							children: "Luas Area:"
						}), /* @__PURE__ */ jsx(Text, {
							style: styles.metaValue,
							children: projectArea ? `${projectArea} m²` : "N/A"
						})]
					}), /* @__PURE__ */ jsxs(View, {
						style: styles.metaRow,
						children: [/* @__PURE__ */ jsx(Text, {
							style: styles.metaLabel,
							children: "Tanggal:"
						}), /* @__PURE__ */ jsx(Text, {
							style: styles.metaValue,
							children: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
								year: "numeric",
								month: "long",
								day: "numeric"
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Text, {
				style: styles.sectionTitle,
				children: "1. Rincian Pekerjaan Konstruksi (AHSP SNI)"
			}),
			/* @__PURE__ */ jsxs(View, {
				style: styles.table,
				children: [/* @__PURE__ */ jsxs(View, {
					style: styles.tableHeader,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: "No"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colCode,
							children: "Kode"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colName,
							children: "Item Pekerjaan"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colUnit,
							children: "Sat"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colVol,
							children: "Volume"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colRate,
							children: "Harga Sat"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colSub,
							children: "Total"
						})
					]
				}), calculatorResults.items.map((item, idx) => /* @__PURE__ */ jsxs(View, {
					style: idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: idx + 1
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colCode,
							children: item.kodeAHSP || "-"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colName,
							children: item.namaPekerjaan
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colUnit,
							children: item.satuanVolume
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colVol,
							children: item.volume.toFixed(2)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colRate,
							children: formatPDFRupiah(item.unitRate)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colSub,
							children: formatPDFRupiah(item.totalCost)
						})
					]
				}, item.slug))]
			}),
			/* @__PURE__ */ jsx(Text, {
				style: styles.sectionTitle,
				children: "2. Kebutuhan Bahan Material (Est. Bill of Materials)"
			}),
			/* @__PURE__ */ jsxs(View, {
				style: styles.table,
				children: [/* @__PURE__ */ jsxs(View, {
					style: styles.tableHeader,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: "No"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMName,
							children: "Nama Material"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMUnit,
							children: "Satuan"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMVol,
							children: "Volume"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMRate,
							children: "Harga Satuan"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMSub,
							children: "Subtotal"
						})
					]
				}), calculatorResults.billOfMaterials.map((mat, idx) => /* @__PURE__ */ jsxs(View, {
					style: idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: idx + 1
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMName,
							children: mat.nama
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMUnit,
							children: mat.satuan
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMVol,
							children: mat.totalVolume.toFixed(2)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMRate,
							children: formatPDFRupiah(mat.hargaSatuan)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMSub,
							children: formatPDFRupiah(mat.subtotal)
						})
					]
				}, idx))]
			}),
			/* @__PURE__ */ jsx(Text, {
				style: styles.sectionTitle,
				children: "3. Kebutuhan Tenaga Kerja (Est. Upah Kerja)"
			}),
			/* @__PURE__ */ jsxs(View, {
				style: styles.table,
				children: [/* @__PURE__ */ jsxs(View, {
					style: styles.tableHeader,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: "No"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMName,
							children: "Tenaga Kerja"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMUnit,
							children: "Satuan"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMVol,
							children: "Jumlah (OH)"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMRate,
							children: "Tarif Harian"
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMSub,
							children: "Subtotal"
						})
					]
				}), calculatorResults.laborRequirements.map((lab, idx) => /* @__PURE__ */ jsxs(View, {
					style: idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating,
					children: [
						/* @__PURE__ */ jsx(Text, {
							style: styles.colNo,
							children: idx + 1
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMName,
							children: lab.jenisPekerja
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMUnit,
							children: lab.satuan
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMVol,
							children: lab.totalOH.toFixed(2)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMRate,
							children: formatPDFRupiah(lab.tarifHarian)
						}),
						/* @__PURE__ */ jsx(Text, {
							style: styles.colBOMSub,
							children: formatPDFRupiah(lab.subtotal)
						})
					]
				}, idx))]
			}),
			/* @__PURE__ */ jsx(View, {
				style: styles.summarySection,
				children: /* @__PURE__ */ jsxs(View, {
					style: styles.summaryBox,
					children: [
						/* @__PURE__ */ jsxs(View, {
							style: styles.summaryRow,
							children: [/* @__PURE__ */ jsx(Text, {
								style: { color: "#555555" },
								children: "Subtotal Pekerjaan:"
							}), /* @__PURE__ */ jsx(Text, {
								style: { fontFamily: "Helvetica-Bold" },
								children: formatPDFRupiah(calculatorResults.subtotal)
							})]
						}),
						/* @__PURE__ */ jsxs(View, {
							style: styles.summaryRow,
							children: [/* @__PURE__ */ jsx(Text, {
								style: { color: "#555555" },
								children: "Fee Kontraktor:"
							}), /* @__PURE__ */ jsx(Text, { children: formatPDFRupiah(calculatorResults.profitCost) })]
						}),
						/* @__PURE__ */ jsxs(View, {
							style: styles.summaryRow,
							children: [/* @__PURE__ */ jsx(Text, {
								style: { color: "#555555" },
								children: "PPN:"
							}), /* @__PURE__ */ jsx(Text, { children: formatPDFRupiah(calculatorResults.taxCost) })]
						}),
						/* @__PURE__ */ jsxs(View, {
							style: styles.summaryRowBold,
							children: [/* @__PURE__ */ jsx(Text, { children: "TOTAL BIAYA:" }), /* @__PURE__ */ jsx(Text, {
								style: { color: "#8c6239" },
								children: formatPDFRupiah(calculatorResults.totalCost)
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs(View, {
				style: styles.disclaimer,
				children: [/* @__PURE__ */ jsx(Text, { children: "Catatan: Hasil estimasi biaya (RAB) ini bersifat perkiraan kasar berdasarkan harga material dan upah harian standar nasional yang terdaftar pada sistem kami. Biaya sebenarnya dapat bervariasi bergantung pada spesifikasi teknis akhir, kondisi tanah lapangan, dan fluktuasi harga pasar riil." }), /* @__PURE__ */ jsx(Text, {
					style: { marginTop: 4 },
					children: "Creativa Studio • Jl. Kayu Putih Raya No. 12, Kebayoran Baru, Jakarta Selatan"
				})]
			})
		]
	}) });
};
//#endregion
//#region src/pages/api/rab-pdf.ts
var rab_pdf_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { clientName = "Klien Creativa Studio", projectLocation = "Indonesia", projectArea = 0, items = [], taxRatePercent = 0, profitRatePercent = 0 } = await request.json();
		if (!items || !Array.isArray(items) || items.length === 0) return new Response(JSON.stringify({ error: "Tidak ada item pekerjaan yang dipilih." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const reader = createReader(process.cwd(), keystatic_config_default);
		const rawMaterials = await reader.collections.hargaBahan.all();
		const rawWages = await reader.collections.hargaUpah.all();
		const rawAHSP = await reader.collections.ahspItem.all();
		const materialsRecord = {};
		rawMaterials.forEach((m) => {
			materialsRecord[m.slug] = {
				slug: m.slug,
				...m.entry
			};
		});
		const wagesRecord = {};
		rawWages.forEach((w) => {
			wagesRecord[w.slug] = {
				slug: w.slug,
				...w.entry
			};
		});
		const ahspRecord = {};
		rawAHSP.forEach((a) => {
			ahspRecord[a.slug] = {
				slug: a.slug,
				...a.entry
			};
		});
		const calculatorResults = calculateDetailedRAB(items, ahspRecord, materialsRecord, wagesRecord, taxRatePercent, profitRatePercent);
		const arrayBuffer = await (await pdf(React.createElement(RABPdfDocument, {
			clientName,
			projectLocation,
			projectArea,
			calculatorResults
		})).toBlob()).arrayBuffer();
		return new Response(arrayBuffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="RAB_CreativaStudio_${clientName.replace(/\s+/g, "_")}.pdf"`,
				"Content-Length": arrayBuffer.byteLength.toString(),
				"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
			}
		});
	} catch (err) {
		console.error("PDF Generation API Error:", err);
		return new Response(JSON.stringify({ error: err.message || "Gagal menghasilkan dokumen PDF." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/rab-pdf@_@ts
var page = () => rab_pdf_exports;
//#endregion
export { page };
